import { EntityRepository } from 'typeorm';
import { AbstractRepository } from '../abstract';
import { Task } from '../../models';

@EntityRepository(Task)
export class TaskRepository extends AbstractRepository<Task> {
	getAll(skip: number, take: number) {
		return (
			this.createQueryBuilder('task')
				.leftJoinAndSelect('task.user', 'user')
				// .leftJoinAndSelect('task.reactions', 'reactions')
				.select(['task', 'user.name', 'user.id'])
				.skip(skip)
				.take(take)
				.getMany()
		);
	}

	updateById(id: string, data: Partial<Task>) {
		return this.createQueryBuilder().update().set(data).where('id = :id', { id }).execute();
	}

	getById(id: string) {
		return this.createQueryBuilder('task').where('task.id = :id', { id }).getOne();
	}
}
