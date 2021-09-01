import { EntityRepository, Like, Repository } from 'typeorm';
import { ClansOrderByOptions } from '../../../common';
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
				'member.username',
				'member.createdAt',
				'member.username',
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
			.select([
				'clan',
				'member.id',
				'member.rank',
				'member.username',
				'member.honor',
				'profileClan.role',
				'profileClan.status',
			])
			.skip(skip)
			.take(take)
			.getMany();
	}

	async search(query: {
		orderBy: ClansOrderByOptions;
		order: 'ASC' | 'DESC';
		skip: number;
		take: number;
		nameQuery?: string;
	}) {
		const { orderBy, order, nameQuery = '', take, skip } = query;
		const searchQuery = this.createQueryBuilder('clan')
			.leftJoinAndSelect('clan.members', 'member')
			.leftJoinAndSelect('member.profileClan', 'profileClan')
			.where('clan.name ILIKE :q', { q: `%${nameQuery.toLowerCase()}%` });

		if (orderBy !== ClansOrderByOptions.BY_RANK && orderBy !== ClansOrderByOptions.BY_HONOR) {
			searchQuery.orderBy(`clan.${orderBy}`, order);
		}

		return {
			count: await searchQuery.select('DISTINCT(clan.id)').getCount(),
			data: await searchQuery
				.select(['clan', 'member.id', 'member.rank', 'member.honor', 'profileClan.role', 'profileClan.status'])
				.skip(skip)
				.take(take)
				.getMany(),
		};
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
