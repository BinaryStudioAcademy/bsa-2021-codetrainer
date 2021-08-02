import { getCustomRepository } from 'typeorm';
import { TClanRepository, TProfileClanRepository, TUserRepository } from '../../data';
import { IUserFields } from '../../types';
import { ValidationError } from '../../helpers';
import { CLAN_IS_PUBLIC, CLAN_MAX_MEMBERS, CLAN_MEMBER_ROLE, CLAN_MEMBER_STATUS } from '../../common';

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
			throw new ValidationError({ message: 'You is already in clan', status: 401 });
		}

		const repository = getCustomRepository(this.clanRepository);
		const clan = await repository.getByName(name);
		if (clan) {
			throw new ValidationError({ message: `Clan name: ${name} is already taken.`, status: 401 });
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
			throw new ValidationError({ message: 'You have no clan', status: 401 });
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

		await repository.updateById(user.clan.id, { name, isPublic });
		const newClan = await repository.getById(user.clan.id);
		return newClan;
	}

	async getClans({ skip = 0, take = 10 }) {
		const repository = getCustomRepository(this.clanRepository);
		const clans = await repository.getAll(skip, take);
		return clans;
	}
}
