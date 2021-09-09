import { getCustomRepository } from 'typeorm';
import { Task, User, TTaskRepository, TUserRepository, TCommentTaskRepository, CommentTask } from '../../data';

export class CommentTaskService {
	protected commentTaskRepository: TCommentTaskRepository;

	constructor({ commentTask }: { commentTask: TCommentTaskRepository }) {
		this.commentTaskRepository = commentTask;
	}

	async getCommentTasksByTaskId(id: string, { skip = 0, take = 10 }) {
		const repository = getCustomRepository(this.commentTaskRepository);
		const commentTask = await repository.getAllByTaskId(id, skip, take);
		return commentTask;
	}

	async getAllCommentTasks({ skip = 0, take = 10 }) {
		const repository = getCustomRepository(this.commentTaskRepository);
		const [commentTasks, count] = await repository.getAll(skip, take);
		return { comment: commentTasks, count };
	}

	async create(task: Task, user: User, commentTask: CommentTask) {
		const repository = getCustomRepository(this.commentTaskRepository);

		const newCommentTask = await repository.save({
			...commentTask,
			task,
			user,
		});

		return newCommentTask;
	}

	async update(id: string, updates: Partial<CommentTask>) {
		const repository = getCustomRepository(this.commentTaskRepository);

		const updatedCommentTask = await repository.updateById(id, updates);

		return updatedCommentTask;
	}

	async remove(id: string) {
		const repository = getCustomRepository(this.commentTaskRepository);

		const res = await repository.removeById(id);

		return {
			deleted: !!res.affected,
		};
	}
}
