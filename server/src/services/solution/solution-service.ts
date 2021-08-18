import { getCustomRepository } from 'typeorm';
import { Solution, TSolutionRepository, User, TUserRepository, Task, TTaskRepository } from '../../data';
import { CODE_ERRORS } from '../../common';
import { ValidationError } from '../../helpers';
import { rabbitConnect } from '../../config';

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
}
