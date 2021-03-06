import { getCustomRepository } from 'typeorm';
import { Solution, TSolutionRepository, User, TUserRepository, Task, TTaskRepository } from '../../data';
import { CODE_ERRORS, ENV, SOLUTION_STATUS } from '../../common';
import {
	calculateRank,
	TokenTypes,
	ValidationError,
	verifyToken,
	fromEntries,
	checkStatusSolution,
} from '../../helpers';
import { rabbitConnect } from '../../config';
import { ISendToRabbit, TypeTest, ITestResult } from '../../types/sendToRabbit';

interface IConstructor {
	task: TTaskRepository;
	user: TUserRepository;
	solution: TSolutionRepository;
}

interface ICreateSolution {
	user: User;
	task: Task;
	code: string;
	testCases: string;
	typeTest: TypeTest;
	status?: SOLUTION_STATUS;
}

interface ISolutionData extends ICreateSolution {
	solution: Solution;
}

export class SolutionService {
	protected taskRepository: TTaskRepository;

	protected userRepository: TUserRepository;

	protected solutionRepository: TSolutionRepository;

	protected fieldForPatch = ['status', 'code', 'testCases'];

	constructor({ task, user, solution }: IConstructor) {
		this.taskRepository = task;
		this.userRepository = user;
		this.solutionRepository = solution;
	}

	async sendToRabbit({ user, task, code, solution, typeTest }: ISolutionData) {
		const dataForRabbit: ISendToRabbit = {
			test: typeTest === TypeTest.TEST_SOLUTION_ATTEMPT ? task.testCases : solution.testCases,
			userId: user.id,
			solutionId: solution.id,
			status: solution.status,
			taskId: task.id,
			typeTest,
			code,
		};
		await rabbitConnect.send(dataForRabbit);
	}

	async create(data: ICreateSolution) {
		const { code, testCases, user, task, typeTest } = data;
		const repository = getCustomRepository(this.solutionRepository);
		const taskRepository = getCustomRepository(this.taskRepository);
		const userRepository = getCustomRepository(this.userRepository);
		const solution = repository.getByTaskAndByUser(user.id, task.id);
		if (!solution) {
			throw new ValidationError(CODE_ERRORS.SOLUTION_THIS_USER);
		}
		const newSolution = await repository.save({
			testCases,
			code,
			user,
			task,
		});
		await taskRepository.save({
			...task,
			solutions: [...task.solutions, newSolution],
		});
		await userRepository.save({
			...user,
			solutions: [...user.solutions, newSolution],
		});
		if (typeTest) {
			await this.sendToRabbit({ ...data, solution: newSolution });
		}
		return newSolution;
	}

	async delete(user: User, solution: Solution) {
		const repository = getCustomRepository(this.solutionRepository);
		const userRepository = getCustomRepository(this.userRepository);
		const taskRepository = getCustomRepository(this.taskRepository);
		const userSolutions = user.solutions.filter((solutionU) => solutionU.id !== solution.id);
		await userRepository.save({
			...user,
			solutions: userSolutions,
		});
		const task = await taskRepository.getById(solution.task.id);
		if (task) {
			const taskSolutions = task.solutions.filter((solutionT) => solutionT.id !== solution.id);
			await taskRepository.save({
				...task,
				solutions: taskSolutions,
			});
		}
		await repository.deleteById(solution.id);
		return {
			delete: 'success',
		};
	}

	async update(data: ISolutionData) {
		const { user, solution, code, testCases } = data;
		if (user.id !== solution.user.id) {
			throw new ValidationError(CODE_ERRORS.NOT_USER_SOLUTION);
		}
		const repository = getCustomRepository(this.solutionRepository);
		await repository.updateById(solution.id, { code, testCases });
		const updatedSolution = await repository.getByKey(solution.id, 'id');
		await this.sendToRabbit({ ...data, solution: updatedSolution || solution });
		return updatedSolution;
	}

	async patch(data: ISolutionData) {
		const { user, solution } = data;
		if (user.id !== solution.user.id) {
			throw new ValidationError(CODE_ERRORS.NOT_USER_SOLUTION);
		}

		const solutionStatus =
			solution.status === SOLUTION_STATUS.UNLOCKED || solution.status === SOLUTION_STATUS.COMPLETED;
		if (solutionStatus && Boolean(data?.status)) {
			throw new ValidationError(CODE_ERRORS.SOLUTION_STATUS_UNLOCKED);
		}

		const dataToUpdate = fromEntries(
			Object.entries(data).filter(([key, value]) => this.fieldForPatch.includes(key) && value),
		);
		const repository = getCustomRepository(this.solutionRepository);
		await repository.updateById(solution.id, dataToUpdate);
		const patchedSolution = await repository.getByKey(solution.id, 'id');
		return patchedSolution;
	}

	async getSolutions() {
		const repository = getCustomRepository(this.solutionRepository);
		const solutions = await repository.getAll();
		return solutions;
	}

	async getUserSolution(user: User, task: Task) {
		const repository = getCustomRepository(this.solutionRepository);
		const solution = await repository.getByTaskAndByUser(user.id, task.id);
		const useTasks = await repository.getTasksByUser(user.id);
		const taskRepository = getCustomRepository(this.taskRepository);
		const nextTask = await taskRepository.searchNotUseTask([...useTasks, task.id]);

		return { solution, nextTaskId: nextTask?.id ?? null };
	}

	async setResult({ token, status, solutionId, ...data }: ITestResult) {
		const { id } = verifyToken(token, TokenTypes.ACCESS);
		if (id !== ENV.TESTING.NAME) {
			throw new ValidationError(CODE_ERRORS.TESTING_NAME_INCORRECT);
		}
		const repository = getCustomRepository(this.solutionRepository);
		const userRepository = getCustomRepository(this.userRepository);
		const taskRepository = getCustomRepository(this.taskRepository);
		const task = await taskRepository.getById(data.taskId);
		let user = await userRepository.getById(data.userId);
		const checkStatus = status !== SOLUTION_STATUS.COMPLETED && status !== SOLUTION_STATUS.UNLOCKED;
		if (checkStatus && data.typeTest === TypeTest.TEST_SOLUTION_ATTEMPT) {
			const statusSolution = checkStatusSolution(data.result.response);
			const userData = calculateRank.check({ user, task, status: statusSolution });
			await repository.updateById(solutionId as string, { status: statusSolution });
			await userRepository.updateById(data.userId, userData);
			user = await userRepository.getById(data.userId);
		}

		const solution = await repository.getByKey(solutionId as string, 'id');
		return { ...data, solution, user };
	}
}
