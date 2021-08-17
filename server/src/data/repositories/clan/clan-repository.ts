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
			.leftJoinAndSelect('member.profileClan', 'profileClan')
			.select([
				'clan',
				'member.name',
				'member.createdAt',
				'member.surname',
				'member.id',
				'member.honor',
				'member.rank',
				'profileClan.role',
				'profileClan.status',
			])
			.where('clan.id = :id', { id })
			.getOne();
	}

	getAll(skip: number, take: number) {
		return this.createQueryBuilder('clan')
			.leftJoinAndSelect('clan.members', 'member')
			.leftJoinAndSelect('member.profileClan', 'profileClan')
			.select(['clan', 'member.id', 'member.rank', 'member.honor', 'profileClan.role', 'profileClan.status'])
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

	addMember(id: string, memberId: string) {
		return this.createQueryBuilder('clan').relation('members').of(id).add(memberId);
	}

	deleteById(id: string) {
		return this.createQueryBuilder().delete().where('id = :id', { id }).execute();
	}
}
