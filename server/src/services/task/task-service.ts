import { getCustomRepository } from 'typeorm';
import { Task, User, TTaskRepository, TUserRepository, TTagRepository, Tag } from '../../data';
import { TASK_ORDER_BY, TASK_STATUS } from '../../common';

export class TaskService {
	protected taskRepository: TTaskRepository;

	protected userRepository: TUserRepository;

	protected tagRepository: TTagRepository;

	constructor({ task, user, tag }: { task: TTaskRepository; user: TUserRepository; tag: TTagRepository }) {
		this.taskRepository = task;
		this.userRepository = user;
		this.tagRepository = tag;
	}

	async getTags(tags: string[] = []) {
		const getTag = async (tagName: string) => {
			const tagService = getCustomRepository(this.tagRepository);
			let tag = await tagService.getByKey(tagName, 'name');
			if (!tag) {
				tag = await tagService.save({ name: tagName });
			}
			return tag;
		};
		const newTags = await Promise.all(tags.map(getTag));
		return newTags;
	}

	async create(user: User, task: Task, tags: string[] = []) {
		const repository = getCustomRepository(this.taskRepository);
		const userRepository = getCustomRepository(this.userRepository);
		const tagsForSave = await this.getTags(tags);
		const newTask = await repository.save({
			...task,
			user,
			isPublished: false,
			status: TASK_STATUS.BETA,
			...(tagsForSave.length ? { tags: tagsForSave } : {}),
		});
		await userRepository.save({ id: user.id, tasks: [...user.tasks, newTask] });
		const savedTask = await repository.getById(newTask.id);
		return savedTask;
	}

	async delete(user: User, task: Task) {
		const repository = getCustomRepository(this.taskRepository);
		const userRepository = getCustomRepository(this.userRepository);
		const tagRepository = getCustomRepository(this.tagRepository);
		await Promise.all(
			task.tags.map((tag) => {
				const newTasks = tag.tasks?.filter((taskT) => taskT.id !== task.id);
				return tagRepository.save({ ...tag, tasks: newTasks });
			}),
		);
		const userTasks = user.tasks.filter((taskU) => taskU.id !== task.id);
		await userRepository.save({ ...user, tasks: userTasks });
		await repository.deleteById(task.id);
		return {
			delete: 'success',
		};
	}

	async update(newTask: Task, taskId: string, tags: string[] = []) {
		const repository = getCustomRepository(this.taskRepository);
		const tagsForSave = await this.getTags(tags);
		await repository.save({ ...newTask, ...(tagsForSave.length ? { tags: tagsForSave } : {}) });
		const updatedTask = await repository.getById(taskId);
		return updatedTask;
	}

	async getTasks({ skip = 0, take = 10 }) {
		const repository = getCustomRepository(this.taskRepository);
		const tasks = await repository.getAll(skip, take);
		return tasks;
	}

	async search(
		queryFilter: {
			query?: string;
			sort?: TASK_ORDER_BY;
			status?: string;
			progress?: string;
			rank?: number;
			tags?: string;
			page: number;
		},
		user: User,
	) {
		const { sort, page, ...where } = queryFilter;
		const repository = getCustomRepository(this.taskRepository);
		const tagRepository = getCustomRepository(this.tagRepository);
		return {
			tags: await tagRepository.getAll(),
			tasks: await repository.search({
				where,
				sort,
				// skip: page * TASKS_ON_PAGE,
				// take: TASKS_ON_PAGE,
				userId: user.id,
			}),
			ranks: await repository.getRanks(),
		};
	}
}
