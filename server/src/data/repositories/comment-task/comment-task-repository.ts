import { EntityRepository } from 'typeorm';
import { AbstractRepository } from '../abstract';
import { CommentTask } from '../../models';

@EntityRepository(CommentTask)
export class CommentTaskRepository extends AbstractRepository<CommentTask> {
	taskFields = ['task.id', 'task.name'];

	userFields = ['user.id', 'user.name', 'user.surname', 'user.avatar'];

	getAll(skip: number, take: number) {
		return this.createQueryBuilder('comment_task')
			.leftJoinAndSelect('comment_task.task', 'task')
			.leftJoinAndSelect('comment_task.user', 'user')
			.leftJoinAndSelect('user.clan', 'clan')
			.select([
				'comment_task.id',
				'comment_task.createdAt',
				'comment_task.body',
				'clan.name',
				'clan.id',
				...this.taskFields,
				...this.userFields,
			])
			.orderBy('comment_task.createdAt', 'DESC')
			.skip(skip)
			.take(take)
			.getManyAndCount();
	}

	getAllByTaskId(id: string, skip: number, take: number) {
		return this.createQueryBuilder('comment_task')
			.leftJoinAndSelect('comment_task.task', 'task')
			.leftJoinAndSelect('comment_task.user', 'user')
			.leftJoinAndSelect('user.clan', 'clan')
			.where('task.id = :id', { id })
			.select([
				'comment_task.id',
				'comment_task.createdAt',
				'comment_task.body',
				'clan.name',
				'clan.id',
				...this.taskFields,
				...this.userFields,
			])
			.orderBy('comment_task.createdAt', 'DESC')
			.skip(skip)
			.take(take)
			.getMany();
	}

	getById(id: string) {
		return this.createQueryBuilder('comment_task')
			.leftJoinAndSelect('comment_task.task', 'task')
			.leftJoinAndSelect('comment_task.user', 'user')
			.leftJoinAndSelect('user.clan', 'clan')
			.where('comment_task.id = :id', { id })
			.select([
				'comment_task.id',
				'comment_task.createdAt',
				'comment_task.body',
				'clan.name',
				'clan.id',
				...this.taskFields,
				...this.userFields,
			])
			.getOne();
	}

	async updateById(id: string, updates: Partial<CommentTask>) {
		await this.update({ id }, updates);
		return this.getById(id);
	}

	removeById(id: string) {
		return this.delete(id);
	}
}
