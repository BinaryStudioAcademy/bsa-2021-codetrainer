import { EntityRepository } from 'typeorm';
import { AbstractRepository } from '../abstract';
import { ITaskFields } from '../../../types';
import { Task } from '../../models';

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

	getById(id: string) {
		return this.createQueryBuilder('task').where('task.id = :id', { id }).getOne();
	}

	updateById(id: string, data: Partial<ITaskFields>) {
		return this.save({ id, ...data });
	}
}
