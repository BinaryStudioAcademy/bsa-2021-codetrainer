import { getCustomRepository } from 'typeorm';
import { Task, Tag, TTaskRepository, TTagRepository } from '../../data';
import { CODE_ERRORS } from '../../common';
import { ValidationError } from '../../helpers';

export class TagService {
	protected taskRepository: TTaskRepository;

	protected tagRepository: TTagRepository;

	constructor({ task, tag }: { task: TTaskRepository; tag: TTagRepository }) {
		this.taskRepository = task;
		this.tagRepository = tag;
	}

	async create(name: string) {
		const repository = getCustomRepository(this.tagRepository);
		const tag = await repository.getByKey(name, 'name');
		if (tag) {
			throw new ValidationError(CODE_ERRORS.TAG_NAME_EXIT(name));
		}
		const newTag = await repository.save({
			name,
		});
		return newTag;
	}

	async delete(tag: Tag) {
		const repository = getCustomRepository(this.tagRepository);
		const taskRepository = getCustomRepository(this.taskRepository);
		const tasks = await taskRepository.findByIds(tag.tasks.map((task) => task.id));
		await Promise.all(
			tasks.map((task) => {
				const tags = task.tags.filter((tagFilter) => tagFilter.id !== tag.id);
				return taskRepository.save({ ...task, tags });
			}),
		);
		await repository.deleteById(tag.id);
		return {
			delete: 'success',
		};
	}

	switchTask(tasks: Task[], newTask?: Task): Task[] {
		if (!newTask) {
			return tasks;
		}
		const newTasks = tasks.filter((task) => task.id === newTask.id);
		return newTasks.length === tasks.length ? [...tasks, newTask] : newTasks;
	}

	async update(tag: Tag, taskId: string) {
		const repository = getCustomRepository(this.tagRepository);
		const taskRepository = getCustomRepository(this.taskRepository);
		const tasks = this.switchTask(tag.tasks, await taskRepository.getById(taskId));
		const updatedTag = await repository.save({
			...tag,
			tasks,
		});
		return updatedTag;
	}

	async getTags() {
		const repository = getCustomRepository(this.tagRepository);
		const tags = await repository.getAll();
		return tags;
	}
}
