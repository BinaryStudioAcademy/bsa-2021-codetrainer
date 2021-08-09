import { EntityRepository, Repository } from 'typeorm';
import { Clan } from '../../models';
import { AbstractRepository } from '../abstract';

@EntityRepository(Clan)
export class ClanRepository extends AbstractRepository<Clan> {
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

	updateById(id: string, data: Partial<Clan>) {
		return this.update({ id }, data);
	}

	deleteMember(id: string, memberId: string) {
		return this.createQueryBuilder('clan').relation('members').of(id).remove(memberId);
	}
}
