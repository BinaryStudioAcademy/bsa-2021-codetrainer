import { RequestHandler } from 'express';
import { getCustomRepository } from 'typeorm';
import { HttpCodes, CREATE_ERRORS, ERRORS } from '../../../common';
import { CommentSolutionRepository } from '../../../data';

export const checkCommentSolutionIdMiddleware: RequestHandler = async (req, res, next) => {
	const repository = getCustomRepository(CommentSolutionRepository);
	const comment = await repository.getByKey(req.params.id, 'id');
	if (!comment) {
		res.status(HttpCodes.BAD_REQUEST).send(CREATE_ERRORS(ERRORS.NO_COMMENT_SOLUTION));
	} else {
		req.commentSolution = comment;
		next();
	}
};
