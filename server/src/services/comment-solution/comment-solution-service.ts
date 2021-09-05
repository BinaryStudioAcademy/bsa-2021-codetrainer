import { getCustomRepository, DeleteResult } from 'typeorm';
import { CODE_ERRORS } from '../../common';
import {
	TCommentSolutionRepository,
	TUserRepository,
	User,
	Solution,
	CommentSolution,
	TSolutionRepository,
} from '../../data';
import { ValidationError } from '../../helpers';

interface ICommentConstructor {
	user: TUserRepository;
	solution: TSolutionRepository;
	comment: TCommentSolutionRepository;
}

interface ICreateComment {
	user: User;
	solution: Solution;
	body: string;
}

interface IUpdateComment extends Omit<ICreateComment, 'solution'> {
	comment: CommentSolution;
}

export class CommentSolutionService {
	private userRepository: TUserRepository;

	private solutionRepository: TSolutionRepository;

	private commentSolutionRepository: TCommentSolutionRepository;

	constructor({ user, solution, comment }: ICommentConstructor) {
		this.userRepository = user;
		this.solutionRepository = solution;
		this.commentSolutionRepository = comment;
	}

	async create({ user, solution, body }: ICreateComment): Promise<CommentSolution> {
		const commentRepository = getCustomRepository(this.commentSolutionRepository);
		const userRepository = getCustomRepository(this.userRepository);
		const solutionRepository = getCustomRepository(this.solutionRepository);
		const comment = await commentRepository.save({ body, user, solution });
		await userRepository.save({
			...user,
			commentSolutions: [...user.commentSolutions, comment],
		});
		await solutionRepository.save({
			...solution,
			commentSolutions: [...solution.commentSolutions, comment],
		});
		return comment;
	}

	async update({ user, comment, body }: IUpdateComment): Promise<{ commentSolution: CommentSolution | undefined }> {
		const commentRepository = getCustomRepository(this.commentSolutionRepository);
		if (user.id !== comment.user.id) {
			throw new ValidationError(CODE_ERRORS.NOT_USER_COMMENT_SOLUTION);
		}
		await commentRepository.updateById(comment.id, { body });
		const newComment = await commentRepository.getByKey(comment.id, 'id');
		return { commentSolution: newComment };
	}

	async getComments(solution: Solution): Promise<CommentSolution[]> {
		const commentRepository = getCustomRepository(this.commentSolutionRepository);
		const comments = await commentRepository.getAll(solution.id);
		return comments;
	}

	async delete({ user, comment, solution }: Omit<ICreateComment, 'body'> & { comment: CommentSolution }) {
		const repository = getCustomRepository(this.commentSolutionRepository);
		const userRepository = getCustomRepository(this.userRepository);
		const solutionRepository = getCustomRepository(this.solutionRepository);
		const userComments = user.commentSolutions.filter((commentSolution) => commentSolution.id !== comment.id);
		await userRepository.save({
			...user,
			commentSolutions: userComments,
		});
		const commentSolutions = solution.commentSolutions.filter(
			(commentSolution) => commentSolution.id !== comment.id,
		);
		await solutionRepository.save({
			...solution,
			commentSolutions,
		});
		await repository.deleteById(comment.id);
		return {
			delete: 'success',
		};
	}
}
