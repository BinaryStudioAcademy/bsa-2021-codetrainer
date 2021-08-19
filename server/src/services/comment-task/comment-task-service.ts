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
		const commentTask = await repository.getAll(skip, take);
		return commentTask;
	}

	async create(commentTask: CommentTask) {
		const repository = getCustomRepository(this.commentTaskRepository);

		const newCommentTask = await repository.save({
			...commentTask,
		});
		return {
			commentTask: newCommentTask,
		};
	}

	async remove(id: string) {
		const repository = getCustomRepository(this.commentTaskRepository);

		const res = await repository.removeById(id);

		return {
			deleted: !!res.affected,
		};
	}
	// async getTasks({ skip = 0, take = 10 }) {
	// 	const repository = getCustomRepository(this.taskRepository);
	// 	const clans = await repository.getAll(skip, take);
	// 	return clans;
	// }

	// async create(user: User, task: Task) {
	// 	const repository = getCustomRepository(this.taskRepository);
	// 	const userRepository = getCustomRepository(this.userRepository);
	// 	const newTask = await repository.save({
	// 		...task,
	// 		user,
	// 		isPublished: false,
	// 		status: TASK_STATUS.EDITABLE,
	// 	});
	// 	await userRepository.save({ id: user.id, tasks: [...user.tasks, newTask] });
	// 	const savedTask = await repository.getById(newTask.id);
	// 	return savedTask;
	// }
	//
	// async delete(user: User, id: string) {
	// 	const repository = getCustomRepository(this.taskRepository);
	// 	const userRepository = getCustomRepository(this.userRepository);
	// 	const tasks = user.tasks.filter((task) => task.id !== id);
	// 	await userRepository.save({ id: user.id, tasks });
	// 	await repository.deleteById(id);
	// 	return {
	// 		delete: 'success',
	// 	};
	// }
	//
	// async update(newTask: Task, taskId: string) {
	// 	const repository = getCustomRepository(this.taskRepository);
	// 	await repository.updateById(taskId, newTask);
	// 	const updatedTask = await repository.getById(newTask.id);
	// 	return updatedTask;
	// }
	//
	// async getTasks({ skip = 0, take = 10 }) {
	// 	const repository = getCustomRepository(this.taskRepository);
	// 	const clans = await repository.getAll(skip, take);
	// 	return clans;
	// }
}
