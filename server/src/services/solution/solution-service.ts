import { getCustomRepository } from 'typeorm';
import { Solution, TSolutionRepository, User, TUserRepository, Task, TTaskRepository } from '../../data';
import { CODE_ERRORS, ENV, SOLUTION_STATUS } from '../../common';
import { fromEntries, TokenTypes, ValidationError, verifyToken } from '../../helpers';
import { rabbitConnect } from '../../config';
import { ISendToRabbit, TypeTest } from '../../types/sendToRabbit';

interface ISolutionResult {
	result: { success: boolean; response?: unknown; error?: Error };
	status: SOLUTION_STATUS;
	token: string;
	userId: string;
	solutionId: string;
	taskId: string;
	typeTest: TypeTest;
}

interface IData {
	user: User;
	task: Task;
	code: string;
	testCases: string;
	typeTest: TypeTest;
	status?: SOLUTION_STATUS;
}

interface ISolutionData extends IData {
	solution: Solution;
}

export class SolutionService {
	protected taskRepository: TTaskRepository;

	protected userRepository: TUserRepository;

	protected solutionRepository: TSolutionRepository;

	protected fieldForPatch = ['status', 'code', 'testCases'];

	constructor({
		task,
		user,
		solution,
	}: {
		task: TTaskRepository;
		user: TUserRepository;
		solution: TSolutionRepository;
	}) {
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

	async create(data: IData) {
		const { code, testCases, user, task, typeTest } = data;
		const repository = getCustomRepository(this.solutionRepository);
		const taskRepository = getCustomRepository(this.taskRepository);
		const userRepository = getCustomRepository(this.userRepository);
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
		await repository.updateById(solution.id, { code, status: solution.status, testCases });
		const updatedSolution = await repository.getByKey(solution.id, 'id');
		await this.sendToRabbit({ ...data, solution: updatedSolution || solution });
		return updatedSolution;
	}

	async patch(data: ISolutionData) {
		const { user, solution, status } = data;
		if (user.id !== solution.user.id) {
			throw new ValidationError(CODE_ERRORS.NOT_USER_SOLUTION);
		}

		if (solution.status === SOLUTION_STATUS.UNLOCKED && Boolean(data?.status)) {
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
		const solution = await repository.findOne({ user, task });
		const useTasks = await repository.getTasksByUser(user.id);
		const taskRepository = getCustomRepository(this.taskRepository);
		const nextTask = await taskRepository.searchNotUseTask([...useTasks, task.id]);
		console.log(nextTask);

		return { solution, nextTaskId: nextTask?.id ?? null };
	}

	async setResult({ token, status, ...data }: ISolutionResult) {
		const { id } = verifyToken(token, TokenTypes.ACCESS);
		if (id !== ENV.TESTING.NAME) {
			throw new ValidationError(CODE_ERRORS.TESTING_NAME_INCORRECT);
		}
		const repository = getCustomRepository(this.solutionRepository);
		if (status !== SOLUTION_STATUS.UNLOCKED && data.typeTest === TypeTest.TEST_SOLUTION_ATTEMPT) {
			const statusSolution = data.result.success ? SOLUTION_STATUS.COMPLETED : SOLUTION_STATUS.NOT_COMPLETED;
			await repository.updateById(data.solutionId, { status: statusSolution });
		}
		const solution = await repository.getByKey(data.solutionId, 'id');
		return { ...data, solution };
	}
}
