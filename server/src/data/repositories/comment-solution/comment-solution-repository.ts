import { EntityRepository, Repository } from 'typeorm';
import { CommentSolution } from '../../models';
import { AbstractRepository } from '../abstract';

@EntityRepository(CommentSolution)
export class CommentSolutionRepository extends AbstractRepository<CommentSolution> {
	taskFields = ['solution.id'];

	userFields = ['user.id', 'user.name', 'user.surname'];

	getAll(solutionId: string) {
		return this.createQueryBuilder('comment_solution')
			.leftJoin('comment_solution.solution', 'solution')
			.where('solution.id = :id', { id: solutionId })
			.getMany();
	}

	getByKey(value: string, key: string) {
		return this.createQueryBuilder('comment_solution')
			.leftJoinAndSelect('comment_solution.solution', 'solution')
			.leftJoinAndSelect('comment_solution.user', 'user')
			.select(['comment_solution', ...this.userFields, ...this.taskFields])
			.where(`comment_solution.${key} = :value`, { value })
			.getOne();
	}

	updateById(id: string, data: Partial<CommentSolution>) {
		return this.createQueryBuilder().update().set(data).where('id = :id', { id }).execute();
	}
}
