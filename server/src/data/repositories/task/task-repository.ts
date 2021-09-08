import { EntityRepository, SelectQueryBuilder, ObjectLiteral, IsNull, getRepository } from 'typeorm';
import { AbstractRepository } from '../abstract';
import { Solution, Task } from '../../models';
import { TASK_ORDER_BY, SEARCH_KEYS } from '../../../common';

type IWhere = {
	[K in SEARCH_KEYS]?: number | string | string[];
};

const sortQuery = <T>(query: SelectQueryBuilder<T>, sorts?: TASK_ORDER_BY): SelectQueryBuilder<T> => {
	switch (sorts) {
		case TASK_ORDER_BY.NAME:
			return query.orderBy('task.name', 'ASC');
		case TASK_ORDER_BY.EASIEST:
			return query.orderBy('task.rank', 'DESC');
		case TASK_ORDER_BY.HARDEST:
			return query.orderBy('task.rank', 'ASC');
		case TASK_ORDER_BY.NEWEST:
			return query.orderBy('task.createdAt', 'DESC');
		case TASK_ORDER_BY.OLDEST:
			return query.orderBy('task.createdAt', 'ASC');
		default:
			return query;
	}
};

const filterQuery = <T>(query: SelectQueryBuilder<T>, userId: string, where?: IWhere): SelectQueryBuilder<T> => {
	if (!where) {
		return query;
	}
	Object.entries(where).forEach(([key, value]) => {
		switch (key) {
			case SEARCH_KEYS.STATUS:
				query.andWhere(`task.status = :status`, { status: value });
				break;
			case SEARCH_KEYS.Query:
				query.andWhere('task.name ILIKE :q', { q: `%${typeof value === 'string' ? value.toLowerCase() : value}%` });
				break;
			case SEARCH_KEYS.RANK:
				query.andWhere('task.rank = :rank', { rank: value });
				break;
			case SEARCH_KEYS.TAGS:
				query.andWhere('tag.name IN (:...tags)', { tags: value });
				break;
			case SEARCH_KEYS.PROGRESS:
				if (value === 'all') {
					break;
				}
				query
					.andWhere('user.id = :id', { id: userId })
					.andWhere('solution.status = :solutionStatus', { solutionStatus: value });
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
			.leftJoinAndSelect('task.tags', 'tag')
			.leftJoinAndSelect('task.contributors', 'contributors')
			.select(['task', 'user', 'tag.id', 'tag.name', 'contributors'])
			.skip(skip)
			.take(take)
			.getMany();
	}

	updateById(id: string, data: Partial<Task>) {
		return this.createQueryBuilder().update().set(data).where('id = :id', { id }).execute();
	}

	getById(id: string) {
		return this.createQueryBuilder('task')
			.leftJoinAndSelect('task.solutions', 'solution')
			.leftJoinAndSelect('solution.user', 'solution_user')
			.leftJoinAndSelect('task.tags', 'tag')
			.leftJoinAndSelect('task.user', 'user')
			.leftJoinAndSelect('task.contributors', 'contributors')
			.select(['task', 'solution', 'solution_user', 'tag.id', 'tag.name', 'user', 'contributors'])
			.where('task.id = :id', { id })
			.getOne();
	}

	getRanks() {
		return this.createQueryBuilder('task').select('rank').distinct(true).getRawMany();
	}

	async getSimilarTasks(id: string, rank?: number) {
		return this.createQueryBuilder('task')
			.leftJoinAndSelect('task.tags', 'tags')
			.leftJoinAndSelect('task.user', 'user')
			.select(['task', 'tags', 'user'])
			.where('task.id != :id', { id })
			.andWhere('task.rank = :rank', { rank })
			.orderBy('RANDOM()')
			.limit(2)
			.getMany();
	}

	async searchNotUseTask(taskIds: Array<string>) {
		return this.createQueryBuilder('task')
			.select(['task'])
			.where('task.id NOT IN (:...ids)', { ids: taskIds })
			.orderBy('RANDOM()')
			.limit(1)
			.getOne();
	}

	async search(query: { where?: IWhere; sort?: TASK_ORDER_BY; userId: string; skip: number; take: number }) {
		const searchQuery = filterQuery(
			this.createQueryBuilder('task')
				.leftJoinAndSelect('task.tags', 'tag')
				.leftJoinAndSelect('task.solutions', 'solution')
				.leftJoinAndSelect('solution.user', 'user')
				.leftJoinAndSelect('task.user', 'author'),
			query.userId,
			query.where,
		);
		return {
			count: await searchQuery.select('DISTINCT(task.id)').getCount(),
			tasks: await sortQuery(searchQuery, query.sort)
				.select(['task', 'author.username', 'author.id', 'tag', 'author.name', 'author.surname'])
				.skip(query.skip)
				.take(query.take)
				.getMany(),
		};
	}
}
