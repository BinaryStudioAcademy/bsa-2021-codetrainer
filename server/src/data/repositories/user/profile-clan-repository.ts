import { EntityRepository, Repository } from 'typeorm';
import { CLAN_MEMBER_ROLE } from '../../../common';
import { ProfileClan } from '../../models';

@EntityRepository(ProfileClan)
export class ProfileClanRepository extends Repository<ProfileClan> {
	profileClanFields = ['profile_clan.role', 'profile_clan.status', 'profile_clan.id'];

	getById(id: string) {
		return this.createQueryBuilder('profile_clan')
			.select([...this.profileClanFields])
			.where('profile_clan.id = :id', { id })
			.getOne();
	}

	updateById(id: string, role: string) {
		return this.createQueryBuilder('profile_clan')
			.update()
			.set({ role: role as CLAN_MEMBER_ROLE })
			.where('profile_clan.id = :id', { id })
			.execute();
	}
}