import { getCustomRepository } from 'typeorm';
import { ITaskFields, IUserFields } from '../../types';
import { TTaskRepository, TUserRepository } from '../../data';
import { TASK_STATUS } from '../../common';
import { ValidationError } from '../../helpers';
import { CODE_ERRORS } from '../../common/constants/helpers';

export class TaskService {
	protected taskRepository: TTaskRepository;

	protected userRepository: TUserRepository;

	constructor({ task, user }: { task: TTaskRepository; user: TUserRepository }) {
		this.taskRepository = task;
		this.userRepository = user;
	}

	async create(user: IUserFields, task: ITaskFields) {
		const repository = getCustomRepository(this.taskRepository);
		const userRepository = getCustomRepository(this.userRepository);
		const newTask = await repository.save({
			...task,
			user,
			isPublished: false,
			status: TASK_STATUS.EDITABLE,
		});
		await userRepository.updateById(user.id, { tasks: [...user.tasks, newTask] });
		return newTask;
	}

	async delete(user: IUserFields, id: string) {
		const repository = getCustomRepository(this.taskRepository);
		const userRepository = getCustomRepository(this.userRepository);
		const tasks = user.tasks.filter((task) => task.id !== id);
		await userRepository.updateById(user.id, { tasks });
		await repository.deleteById(id);
		return {
			delete: 'success',
		};
	}

	async update(user: IUserFields, task: ITaskFields) {
		const repository = getCustomRepository(this.taskRepository);
		const newTask = await repository.updateById(task.id, task);
	}

	async getTasks({ skip = 0, take = 10 }) {
		const repository = getCustomRepository(this.taskRepository);
		const clans = await repository.getAll(skip, take);
		return clans;
	}

	async getTaskById(id: string) {
		const repository = getCustomRepository(this.taskRepository);
		const task = await repository.getById(id);
		if (!task) {
			throw new ValidationError(CODE_ERRORS.NO_RECORD);
		}
		return task;
	}
}
