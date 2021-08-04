import { EntityRepository, Repository } from 'typeorm';
import { Clan } from '../../models';
import { IClanFields } from '../../../types';

@EntityRepository(Clan)
export class ClanRepository extends Repository<Clan> {
	getByName(name: string) {
		return this.findOne({ name });
	}

	getById(id: string) {
		return this.createQueryBuilder('clan')
			.leftJoinAndSelect('clan.members', 'member')
			.select(['clan', 'member.name', 'member.id'])
			.where('clan.id = :id', { id })
			.getOne();
	}

	getAll(skip: number, take: number) {
		return this.createQueryBuilder('clan')
			.leftJoinAndSelect('clan.members', 'member')
			.leftJoinAndSelect('member.profileClan', 'profileClan')
			.select(['clan', 'member.name', 'member.id', 'profileClan'])
			.skip(skip)
			.take(take)
			.getMany();
	}

	updateById(id: string, data: Partial<IClanFields>) {
		return this.update({ id }, data);
	}

	deleteMember(id: string, memberId: string) {
		return this.createQueryBuilder('clan').relation('members').of(id).remove(memberId);
	}

	deleteById(id: string) {
		return this.createQueryBuilder().delete().where('id = :id', { id }).execute();
	}
}
