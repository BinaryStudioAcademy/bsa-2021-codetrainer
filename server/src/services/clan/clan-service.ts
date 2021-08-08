import { getCustomRepository } from 'typeorm';
import { TClanRepository, TProfileClanRepository, TUserRepository } from '../../data';
import { IUserFields } from '../../types';
import { ValidationError } from '../../helpers';
import { CLAN_IS_PUBLIC, CLAN_MAX_MEMBERS, CLAN_MEMBER_ROLE, CLAN_MEMBER_STATUS } from '../../common';
import { CODE_ERRORS } from '../../common/constants/helpers';
import { Clan as ClanType } from '../../data/models';

export class Clan {
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

	async create(user: IUserFields, { name, isPublic = CLAN_IS_PUBLIC }: { name: string; isPublic: boolean }) {
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

	async delete({ user }: { user: IUserFields }) {
		const repository = getCustomRepository(this.clanRepository);
		const clan = await repository.getById(user.clan.id);
		if (!clan) {
			throw new ValidationError(CODE_ERRORS.NO_CLAN);
		}

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

	async update(user: IUserFields, { isPublic, name }: { isPublic: boolean; name: string }) {
		const repository = getCustomRepository(this.clanRepository);
		const clan = await repository.getByName(name);
		if (clan) {
			throw new ValidationError(CODE_ERRORS.CLAN_NAME_IS_TAKEN(name));
		}

		await repository.updateById(user.clan.id, { name, isPublic });
		const newClan = await repository.getById(user.clan.id);
		return newClan;
	}

	getHonour({ members }: ClanType) {
		return +(members.reduce((sum, member) => sum + member.honour, 0) / members.length).toFixed();
	}

	getRank({ members }: ClanType) {
		return +(members.reduce((sum, member) => sum + member.rank, 0) / members.length).toFixed();
	}

	async getClans({ skip = 0, take = 10 }) {
		const repository = getCustomRepository(this.clanRepository);
		const clans = (await repository.getAll(skip, take)).map((clan) => ({
			id: clan.id,
			name: clan.name,
			isPublic: clan.isPublic,
			maxMembers: clan.maxMembers,
			numberOfMembers: clan.numberOfMembers,
			createdAt: clan.createdAt,
			honour: this.getHonour(clan),
			rank: this.getRank(clan),
		}));

		return clans;
	}

	async getClan(id: string) {
		const repository = getCustomRepository(this.clanRepository);
		const clan = await repository.getById(id);

		if (!clan) {
			throw new ValidationError(CODE_ERRORS.NOT_EXIST(id));
		}

		return {
			...clan,
			honour: this.getHonour(clan),
			rank: this.getRank(clan),
		};
	}

	async joinClan(user: IUserFields, id: string) {
		const repository = getCustomRepository(this.clanRepository);
		const clan = await this.getClan(id);

		if (!clan) {
			throw new ValidationError(CODE_ERRORS.NOT_EXIST(id));
		}

		if (user.clan) {
			throw new ValidationError(CODE_ERRORS.IN_CLAN);
		}

		await repository.addMember(id, user.id);
	}

	async leaveClan(user: IUserFields, id: string) {
		const repository = getCustomRepository(this.clanRepository);
		const clan = await this.getClan(id);

		if (!clan) {
			throw new ValidationError(CODE_ERRORS.NOT_EXIST(id));
		}

		if (user.clan.id !== id) {
			throw new ValidationError(CODE_ERRORS.NOT_IN_CLAN);
		}

		if (user.profileClan?.role === CLAN_MEMBER_ROLE.ADMIN) {
			throw new ValidationError(CODE_ERRORS.ADMIN_LEAVE);
		}

		await repository.deleteMember(id, user.id);
	}

	async toggleMember(user: IUserFields, id: string) {
		const clan = await this.getClan(id);

		if (!clan) {
			throw new ValidationError(CODE_ERRORS.NOT_EXIST(id));
		}

		const existingMember = clan.members.find((member) => member.id === user.id);

		if (existingMember) {
			await this.leaveClan(user, id);
		} else {
			await this.joinClan(user, id);
		}

		const updatedClan = this.getClan(id);

		return updatedClan;
	}
}
