import { getCustomRepository } from 'typeorm';
import { Clan, TClanRepository, TProfileClanRepository, TUserRepository, User } from '../../data';
import { ValidationError } from '../../helpers';
import {
	ClansOrderByOptions,
	CLAN_IS_PUBLIC,
	CLAN_MAX_MEMBERS,
	CLAN_MEMBER_ROLE,
	CLAN_MEMBER_STATUS,
	CODE_ERRORS,
	Order,
} from '../../common';

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

	async create(user: User, {
		name,
		description,
		isPublic = CLAN_IS_PUBLIC,
		avatar,
		cover,
		maxMembers,
	}: {
		name: string,
		description?: string,
		isPublic: boolean,
		avatar?: string,
		cover?: string,
		maxMembers: number,
	}) {
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
			description,
			isPublic,
			avatar,
			cover,
			members: [user],
			maxMembers,
			numberOfMembers: 1,
		});

		const profileClan = await profileClanRepository.save({
			role: CLAN_MEMBER_ROLE.ADMIN,
			status: CLAN_MEMBER_STATUS.APPROVED,
		});
		await userRepository.updateById(user.id, { profileClan });
		const newUser = await userRepository.getById(user.id);

		return {
			clan: newClan,
			user: newUser,
		}
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

	async update(id: string, data: Clan) {
		const repository = getCustomRepository(this.clanRepository);
		await repository.updateById(id, data);
		const newClan = await this.getClan(id);
		return newClan;
	}

	getHonor({ members }: Clan) {
		return +(members.reduce((sum, member) => sum + member.honor, 0) / members.length).toFixed();
	}

	getRank({ members }: Clan) {
		return +(members.reduce((sum, member) => sum + member.rank, 0) / members.length).toFixed();
	}

	async getClans({ skip = 0, take = 10 }) {
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
		await repository.updateById(id, {
			numberOfMembers: clan.numberOfMembers + 1,
		});
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
		await repository.updateById(id, {
			numberOfMembers: clan.numberOfMembers - 1,
		});
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

	async search(query: {
		order: Order;
		orderBy: ClansOrderByOptions;
		nameQuery?: string;
		take: number;
		skip: number;
	}) {
		const clanRepository = getCustomRepository(this.clanRepository);

		const result = await clanRepository.search(query);

		const clansWithRankAndHonor = result.data.map((clan) => ({
			...clan,
			honor: this.getHonor(clan),
			rank: this.getRank(clan),
		}));

		if (query.orderBy === ClansOrderByOptions.BY_RANK || query.orderBy === ClansOrderByOptions.BY_HONOR) {
			clansWithRankAndHonor.sort((a, b) => {
				return query.order === 'ASC'
					? Number(a[query.orderBy]) - Number(b[query.orderBy])
					: Number(b[query.orderBy]) - Number(a[query.orderBy]);
			});
		}

		return {
			...result,
			data: clansWithRankAndHonor,
		};
	}
}
