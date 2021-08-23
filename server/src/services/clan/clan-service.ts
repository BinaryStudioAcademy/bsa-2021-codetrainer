import { getCustomRepository } from 'typeorm';
import { Clan, TClanRepository, TProfileClanRepository, TUserRepository, User } from '../../data';
import { ValidationError } from '../../helpers';
import { CLAN_IS_PUBLIC, CLAN_MAX_MEMBERS, CLAN_MEMBER_ROLE, CLAN_MEMBER_STATUS, CODE_ERRORS } from '../../common';

export class ClanService {
	protected clanRepository: TClanRepository;

	protected userRepository: TUserRepository;

	protected profileClanRepository: TProfileClanRepository;

	constructor({
		clan,
		user,
		profileClan,
	}: {
		clan: TClanRepository;
		user: TUserRepository;
		profileClan: TProfileClanRepository;
	}) {
		this.clanRepository = clan;
		this.userRepository = user;
		this.profileClanRepository = profileClan;
	}

	async create(user: User, { name, isPublic = CLAN_IS_PUBLIC }: { name: string; isPublic: boolean }) {
		if (user.profileClan) {
			throw new ValidationError(CODE_ERRORS.IN_CLAN);
		}

		const repository = getCustomRepository(this.clanRepository);
		const clan = await repository.getByName(name);
		if (clan) {
			throw new ValidationError(CODE_ERRORS.CLAN_NAME_IS_TAKEN(name));
		}

		const userRepository = getCustomRepository(this.userRepository);
		const profileClanRepository = getCustomRepository(this.profileClanRepository);

		const newClan = await repository.save({
			name,
			isPublic,
			members: [user],
			maxMembers: CLAN_MAX_MEMBERS,
			numberOfMembers: 1,
		});

		const profileClan = await profileClanRepository.save({
			role: CLAN_MEMBER_ROLE.ADMIN,
			status: CLAN_MEMBER_STATUS.APPROVED,
		});
		await userRepository.updateById(user.id, { profileClan });

		return newClan;
	}

	async delete(clan: Clan) {
		const repository = getCustomRepository(this.clanRepository);
		const userRepository = getCustomRepository(this.userRepository);

		await Promise.all(
			clan.members.map((member) => userRepository.updateById(member.id, { profileClan: undefined })),
		);
		await Promise.all(clan.members.map((member) => repository.deleteMember(clan.id, member.id)));

		await repository.deleteById(clan.id);
		return {
			message: 'clan deleted',
		};
	}

	async update(clan: Clan, data: Clan) {
		const repository = getCustomRepository(this.clanRepository);
		await repository.updateById(clan.id, data);
		const newClan = await repository.getById(clan.id);
		return newClan;
	}

	getHonor({ members }: Clan) {
		return +(members.reduce((sum, member) => sum + member.honor, 0) / members.length).toFixed();
	}

	getRank({ members }: Clan) {
		return +(members.reduce((sum, member) => sum + member.rank, 0) / members.length).toFixed();
	}

	async getClans({ skip = 1, take = 5 }) {
		const repository = getCustomRepository(this.clanRepository);
		const clans = (await repository.getAll(skip, take)).map((clan) => ({
			...clan,
			honor: this.getHonor(clan),
			rank: this.getRank(clan),
		}));

		return clans;
	}

	async getClan(id: string) {
		const repository = getCustomRepository(this.clanRepository);
		const clan = await repository.getById(id);

		if (!clan) {
			throw new ValidationError(CODE_ERRORS.CLAN_NOT_EXIST(id));
		}

		return {
			...clan,
			honor: this.getHonor(clan),
			rank: this.getRank(clan),
		};
	}

	async joinClan(user: User, id: string) {
		const repository = getCustomRepository(this.clanRepository);
		const userRepository = getCustomRepository(this.userRepository);
		const profileClanRepository = getCustomRepository(this.profileClanRepository);
		const clan = await this.getClan(id);

		if (!clan) {
			throw new ValidationError(CODE_ERRORS.CLAN_NOT_EXIST(id));
		}

		if (user.clan) {
			throw new ValidationError(CODE_ERRORS.IN_CLAN);
		}

		const profileClan = await profileClanRepository.save({
			role: CLAN_MEMBER_ROLE.MEMBER,
			status: CLAN_MEMBER_STATUS.APPROVED,
		});

		await userRepository.updateById(user.id, { profileClan });
		await repository.addMember(id, user.id);
	}

	async leaveClan(user: User, id: string) {
		const repository = getCustomRepository(this.clanRepository);
		const userRepository = getCustomRepository(this.userRepository);
		const clan = await this.getClan(id);

		if (!clan) {
			throw new ValidationError(CODE_ERRORS.CLAN_NOT_EXIST(id));
		}

		if (user.clan?.id !== id) {
			throw new ValidationError(CODE_ERRORS.NOT_IN_CLAN);
		}
		if (user.profileClan?.role === CLAN_MEMBER_ROLE.ADMIN) {
			let numberOfAdmins = 0;
			clan.members.forEach((member) => {
				if (member.profileClan?.role === CLAN_MEMBER_ROLE.ADMIN) {
					numberOfAdmins += 1;
				}
			});
			if (numberOfAdmins === 1) {
				throw new ValidationError(CODE_ERRORS.LAST_ADMIN_LEAVE);
			}
		}

		await userRepository.updateById(user.id, { profileClan: undefined });
		await repository.deleteMember(id, user.id);
	}

	async toggleMember(user: User, id: string) {
		const userRepository = getCustomRepository(this.userRepository);
		const clan = await this.getClan(id);

		if (!clan) {
			throw new ValidationError(CODE_ERRORS.CLAN_NOT_EXIST(id));
		}

		const existingMember = clan.members.find((member) => member.id === user.id);

		if (existingMember) {
			await this.leaveClan(user, id);
		} else {
			await this.joinClan(user, id);
		}

		const updatedClan = await this.getClan(id);
		const updatedUser = await userRepository.getById(user.id);

		return {
			user: updatedUser,
			clan: updatedClan,
		};
	}
}
