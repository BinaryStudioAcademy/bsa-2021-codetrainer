import { EntityRepository } from 'typeorm';
import { AbstractRepository } from '../abstract';
import { CommentTask } from '../../models';

@EntityRepository(CommentTask)
export class CommentTaskRepository extends AbstractRepository<CommentTask> {
	taskFields = ['task.id', 'task.name'];

	userFields = ['user.id', 'user.name', 'user.surname'];

	getAll(id: string, skip: number, take: number) {
		return this.createQueryBuilder('comment_task')
			.leftJoinAndSelect('comment_task.task', 'task')
			.leftJoinAndSelect('comment_task.user', 'user')
			.where('task.id = :id', { id })
			.select([
				'comment_task.id',
				'comment_task.createdAt',
				'comment_task.body',
				...this.taskFields,
				...this.userFields,
			])
			.skip(skip)
			.take(take)
			.getMany();
	}

	removeById(id: string) {
		return this.delete(id);
	}
}
