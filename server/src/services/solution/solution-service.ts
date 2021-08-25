import { getCustomRepository } from 'typeorm';
import { Solution, TSolutionRepository, User, TUserRepository, Task, TTaskRepository } from '../../data';
import { CODE_ERRORS, ENV, SOLUTION_STATUS } from '../../common';
import { TokenTypes, ValidationError, verifyToken } from '../../helpers';
import { rabbitConnect } from '../../config';

interface ISolutionResult {
	result: { success: boolean; response?: unknown; error?: Error };
	token: string;
	userId: string;
	solutionId: string;
	taskId: string;
}

export class SolutionService {
	protected taskRepository: TTaskRepository;

	protected userRepository: TUserRepository;

	protected solutionRepository: TSolutionRepository;

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

	async create(user: User, task: Task, code: string) {
		const repository = getCustomRepository(this.solutionRepository);
		const taskRepository = getCustomRepository(this.taskRepository);
		const userRepository = getCustomRepository(this.userRepository);
		const newSolution = await repository.save({
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
		const dataForRabbit = {
			test: task.testCases,
			code,
			userId: user.id,
			solutionId: newSolution.id,
			taskId: task.id,
		};
		await rabbitConnect.send(dataForRabbit);
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

	async update(user: User, solution: Solution, code: string) {
		if (user.id !== solution.user.id) {
			throw new ValidationError(CODE_ERRORS.NOT_USER_SOLUTION);
		}
		const repository = getCustomRepository(this.solutionRepository);
		await repository.updateById(solution.id, { code });
		const updatedSolution = await repository.getByKey(solution.id, 'id');
		return updatedSolution;
	}

	async getSolutions() {
		const repository = getCustomRepository(this.solutionRepository);
		const solutions = await repository.getAll();
		return solutions;
	}

	async setResult({ token, ...data }: ISolutionResult) {
		console.info('result => ', data);
		const { id } = verifyToken(token, TokenTypes.ACCESS);
		if (id !== ENV.TESTING.NAME) {
			throw new ValidationError(CODE_ERRORS.TESTING_NAME_INCORRECT);
		}
		const repository = getCustomRepository(this.solutionRepository);
		const status = data.result.success ? SOLUTION_STATUS.COMPLETED : SOLUTION_STATUS.NOT_COMPLETED;
		repository.updateById(data.solutionId, { status });
		return data;
	}
}
