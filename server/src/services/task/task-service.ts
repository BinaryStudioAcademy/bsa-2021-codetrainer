import { getCustomRepository } from 'typeorm';
import { CODE_ERRORS, ENV, SOLUTION_STATUS, TASKS_ON_PAGE, TASK_ORDER_BY, TASK_STATUS } from '../../common';
import { rabbitConnect } from '../../config';
import { Task, User, TTaskRepository, TUserRepository, TTagRepository, Tag, TSolutionRepository } from '../../data';
import { TokenTypes, ValidationError, verifyToken } from '../../helpers';
import { ISendToRabbit, ITestResult, TypeTest } from '../../types';

interface IConstructor {
	task: TTaskRepository;
	user: TUserRepository;
	tag: TTagRepository;
	solution: TSolutionRepository;
}

interface ISearch {
	query?: string;
	sort?: TASK_ORDER_BY;
	status?: string;
	progress?: string;
	rank?: number;
	tags?: { name: string }[];
	page: number;
}

export class TaskService {
	protected taskRepository: TTaskRepository;

	protected userRepository: TUserRepository;

	protected tagRepository: TTagRepository;

	protected solutionRepository: TSolutionRepository;

	constructor({ task, user, tag, solution }: IConstructor) {
		this.taskRepository = task;
		this.userRepository = user;
		this.tagRepository = tag;
		this.solutionRepository = solution;
	}

	async getTags(tags: { name: string }[] = []) {
		const getTag = async ({ name }: { name: string }) => {
			const tagService = getCustomRepository(this.tagRepository);
			let tag = await tagService.getByKey(name, 'name');
			if (!tag) {
				tag = await tagService.save({ name });
			}
			return tag;
		};
		const newTags = await Promise.all(tags.map(getTag));
		return newTags;
	}

	async create(user: User, task: Task, tags: { name: string }[] = []) {
		const repository = getCustomRepository(this.taskRepository);
		const userRepository = getCustomRepository(this.userRepository);
		const tagsForSave = await this.getTags(tags);
		const newTask = await repository.save({
			...task,
			user,
			isPublished: false,
			validateSolution: false,
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

	async update(newTask: Task, taskId: string, tags: { name: string }[] = []) {
		const repository = getCustomRepository(this.taskRepository);
		const tagsForSave = await this.getTags(tags);
		await repository.save({
			...newTask,
			...(tagsForSave.length ? { tags: tagsForSave } : {}),
			isPublished: false,
			validateSolution: false,
		});
		const updatedTask = await repository.getById(taskId);
		return updatedTask;
	}

	async getTasks({ skip = 0, take = 10 }) {
		const repository = getCustomRepository(this.taskRepository);
		const tasks = await repository.getAll(skip, take);
		return tasks;
	}

	async search(queryFilter: ISearch, user: User) {
		const { sort, page, tags, ...where } = queryFilter;
		const repository = getCustomRepository(this.taskRepository);
		const tagRepository = getCustomRepository(this.tagRepository);
		return {
			tags: await tagRepository.getAll(),
			ranks: await repository.getRanks(),
			...(await repository.search({
				where: {
					...where,
					...(tags ? { tags: tags.map(({ name }) => name) } : {}),
				},
				sort,
				skip: page * TASKS_ON_PAGE,
				take: TASKS_ON_PAGE,
				userId: user.id,
			})),
		};
	}

	async getTasksWithUserSolutions({
		userId,
		solutionStatus,
		skip,
		take,
	}: {
		userId: string;
		solutionStatus?: SOLUTION_STATUS;
		skip: number;
		take: number;
	}): Promise<{
		tasks: Task[];
		count: { [key in SOLUTION_STATUS]?: string };
	}> {
		const repository = getCustomRepository(this.taskRepository);
		const solutionRepository = getCustomRepository(this.solutionRepository);
		const solutionsCount: { [key in SOLUTION_STATUS]?: string } = (
			await solutionRepository.getUserCountSolutionsByStatus(userId)
		).reduce((prev, { status, count }) => {
			return { ...prev, [status]: count };
		}, {});
		const tasks = await repository
			.createQueryBuilder('task')
			.innerJoinAndSelect(
				'task.solutions',
				'solution',
				'solution.user = :userId AND solution.task = task.id AND solution.status = :solutionStatus',
				{
					userId,
					solutionStatus,
				},
			)
			.orderBy('solution.createdAt', 'DESC')
			.skip(skip)
			.take(take)
			.getMany();
		return { tasks, count: solutionsCount };
	}

	async getNextTask(userId: string) {
		const repository = getCustomRepository(this.taskRepository);
		const solutionRepository = getCustomRepository(this.solutionRepository);
		const useTasks = await solutionRepository.getTasksByUser(userId);
		const nextTask = await repository.searchNotUseTask(useTasks);
		return { nextTask: nextTask ?? null };
	}

	async getStats(taskId: string) {
		const repository = getCustomRepository(this.taskRepository);

		const task = await repository.getById(taskId);

		const skipped = task?.solutions.filter(solution => solution.status === SOLUTION_STATUS.SKIPPED);
		const unlocked = task?.solutions.filter(solution => solution.status === SOLUTION_STATUS.UNLOCKED);
		const completed = task?.solutions.filter(solution => solution.status === SOLUTION_STATUS.COMPLETED);
		const notCompleted = task?.solutions.filter(solution => solution.status === SOLUTION_STATUS.NOT_COMPLETED);

		return {
			stats: {
				totalSkips: skipped?.length || 0,
				usersTrained: (completed?.length || 0) + (notCompleted?.length || 0),
				totalUnlocked: unlocked?.length || 0,
				usersCompleted: completed?.length || 0
			}
		}
	}

	async getSimilarTasks(id: string) {
		const repository = getCustomRepository(this.taskRepository);
		const task = await repository.getById(id);
		const similarTasks = await repository.getSimilarTasks(id, task?.rank);

		return similarTasks;
	}

	async validation(userId: string, task: Task, typeTest: TypeTest) {
		const dataForRabbit: Partial<ISendToRabbit> = {
			test: task.testCases,
			userId: userId,
			taskId: task.id,
			typeTest,
			code: task.completeSolution,
		};
		await rabbitConnect.send(dataForRabbit);
		return { message: 'validation is send' };
	}

	async setValidation({ token, ...data }: ITestResult) {
		const { id } = verifyToken(token, TokenTypes.ACCESS);
		if (id !== ENV.TESTING.NAME) {
			throw new ValidationError(CODE_ERRORS.TESTING_NAME_INCORRECT);
		}
		const repository = getCustomRepository(this.taskRepository);
		let task = await repository.getById(data.taskId);
		if (data.result.success && data.typeTest === TypeTest.TEST_TASK) {
			await repository.updateById(data.taskId, { validateSolution: true });
			task = await repository.getById(data.taskId);
		}

		return { ...data, task };
	}

	async getUserTasks(userId: string): Promise<Task[]> {
		const repository = getCustomRepository(this.taskRepository);
		const tasks = await repository.searchUserTask(userId);
		return tasks;
	}

	async setPublish(task: Task): Promise<Task | undefined> {
		const repository = getCustomRepository(this.taskRepository);
		if (task.validateSolution) {
			await repository.updateById(task.id, { isPublished: true });
		}
		const updatedTask = await repository.getById(task.id);
		return updatedTask;
	}
}
