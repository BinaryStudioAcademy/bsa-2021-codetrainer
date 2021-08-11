import { EntityRepository, SelectQueryBuilder, Brackets } from 'typeorm';
import { AbstractRepository } from '../abstract';
import { Task } from '../../models';

enum Keys {
	STATUS = 'status',
	PROGRESS = 'progress',
	Q = 'q',
	RANK = 'rank',
	TAGS = 'tags',
}

export enum TaskSorts {
	NEWEST = 'newest',
	OLDEST = 'oldest',
	HARDEST = 'hardest',
	EASIEST = 'easiest',
	NAME = 'name',
}

type IWhere = {
	[K in Keys]?: number | string | string[];
};

const sortFn = <T>(query: SelectQueryBuilder<T>, sorts?: TaskSorts): SelectQueryBuilder<T> => {
	switch (sorts) {
		case TaskSorts.NAME:
			return query.orderBy('task.name', 'ASC');
		case TaskSorts.EASIEST:
			return query.orderBy('task.difficulty', 'DESC');
		case TaskSorts.HARDEST:
			return query.orderBy('task.difficulty', 'ASC');
		case TaskSorts.NEWEST:
			return query.orderBy('task.createdAt', 'ASC');
		case TaskSorts.OLDEST:
			return query.orderBy('task.createdAt', 'DESC');
		default:
			return query;
	}
};

const filter = <T>(query: SelectQueryBuilder<T>, userId: string, where?: IWhere): SelectQueryBuilder<T> => {
	if (!where) {
		return query;
	}
	Object.entries(where).forEach(([key, isValue]) => {
		switch (key) {
			case Keys.STATUS:
				query.andWhere(`task.status = :isValue`, { isValue });
				break;
			case Keys.Q:
				query.andWhere('task.name ILIKE :isValue', { isValue: `%${isValue}%` });
				break;
			case Keys.RANK:
				query.andWhere('task.difficulty = :isValue', { isValue });
				break;
			case Keys.TAGS:
				if (Array.isArray(isValue)) {
					isValue.forEach((tag) => {
						query.andWhere('tag.name = :isValue', { isValue: tag });
					});
				}
				break;
			case Keys.PROGRESS:
				if (isValue === 'all') {
					break;
				}
				query.andWhere('user.id = :id', { id: userId }).andWhere('solution.status = :isValue', { isValue });
				break;
			default:
				break;
		}
	});
	return query;
};

@EntityRepository(Task)
export class TaskRepository extends AbstractRepository<Task> {
	getAll(skip: number, take: number) {
		return this.createQueryBuilder('task')
			.leftJoinAndSelect('task.user', 'user')
			.select(['task', 'user.name', 'user.id'])
			.skip(skip)
			.take(take)
			.getMany();
	}

	updateById(id: string, data: Partial<Task>) {
		return this.createQueryBuilder().update().set(data).where('id = :id', { id }).execute();
	}

	getById(id: string) {
		return this.createQueryBuilder('task').where('task.id = :id', { id }).getOne();
	}

	search({
		where,
		sort,
		skip,
		take,
		userId,
	}: {
		where?: IWhere;
		sort?: TaskSorts;
		skip: number;
		take: number;
		userId: string;
	}) {
		return sortFn(
			filter(
				this.createQueryBuilder('task')
					.leftJoinAndSelect('task.tags', 'tag')
					.leftJoinAndSelect('task.solutions', 'solution')
					.leftJoinAndSelect('solution.users', 'user'),
				userId,
				where,
			),
			sort,
		)
			.skip(skip)
			.take(take)
			.getMany();
	}
}
