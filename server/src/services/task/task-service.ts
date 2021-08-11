import { getCustomRepository } from 'typeorm';
import { Task, User, TTaskRepository, TUserRepository } from '../../data';
import { TASK_STATUS } from '../../common';

export class TaskService {
	protected taskRepository: TTaskRepository;

	protected userRepository: TUserRepository;

	constructor({ task, user }: { task: TTaskRepository; user: TUserRepository }) {
		this.taskRepository = task;
		this.userRepository = user;
	}

	async create(user: User, task: Task) {
		const repository = getCustomRepository(this.taskRepository);
		const userRepository = getCustomRepository(this.userRepository);
		const newTask = await repository.save({
			...task,
			user,
			isPublished: false,
			status: TASK_STATUS.EDITABLE,
		});
		await userRepository.save({ id: user.id, tasks: [...user.tasks, newTask] });
		const savedTask = await repository.getById(newTask.id);
		return savedTask;
	}

	async delete(user: User, id: string) {
		const repository = getCustomRepository(this.taskRepository);
		const userRepository = getCustomRepository(this.userRepository);
		const tasks = user.tasks.filter((task) => task.id !== id);
		await userRepository.save({ id: user.id, tasks });
		await repository.deleteById(id);
		return {
			delete: 'success',
		};
	}

	async update(newTask: Task, taskId: string) {
		const repository = getCustomRepository(this.taskRepository);
		await repository.updateById(taskId, newTask);
		const updatedTask = await repository.getById(newTask.id);
		return updatedTask;
	}

	async getTasks({ skip = 0, take = 10 }) {
		const repository = getCustomRepository(this.taskRepository);
		const clans = await repository.getAll(skip, take);
		return clans;
	}

	// async search(query) {
	// 	const repository = getCustomRepository(this.taskRepository);
	// }
}
