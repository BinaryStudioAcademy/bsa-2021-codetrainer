import { EntityRepository } from 'typeorm';
import { Solution } from '../../models';
import { AbstractRepository } from '../abstract';

@EntityRepository(Solution)
export class SolutionRepository extends AbstractRepository<Solution> {
	getAll() {
		return this.createQueryBuilder('solution').getMany();
	}

	getByKey(value: string, key: string) {
		return this.createQueryBuilder('solution')
			.leftJoinAndSelect('solution.task', 'task')
			.leftJoinAndSelect('solution.user', 'user')
			.leftJoinAndSelect('solution.commentSolutions', 'commentSolutions')
			.select(['solution', 'task.id', 'user.id', 'commentSolutions.id'])
			.where(`solution.${key} = :value`, { value })
			.getOne();
	}

	updateById(id: string, data: Partial<Solution>) {
		return this.createQueryBuilder().update().set(data).where('id = :id', { id }).execute();
	}

	async getTasksByUser(userId: string) {
		const solutions = await this.createQueryBuilder('solution')
			.leftJoinAndSelect('solution.user', 'user')
			.leftJoinAndSelect('solution.task', 'task')
			.select(['solution.id', 'task.id'])
			.where('user.id = :userId', { userId })
			.getMany();

		return solutions.map(({ task: { id } }) => id);
	}
}
