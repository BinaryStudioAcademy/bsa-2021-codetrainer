import { RequestHandler } from 'express';
import { getCustomRepository } from 'typeorm';
import { HttpCodes, CREATE_ERRORS, ERRORS } from '../../../common';

import { CommentTaskRepository } from '../../../data';

export const checkCommentTaskIdMiddleware: RequestHandler = async (req, res, next) => {
	const repository = getCustomRepository(CommentTaskRepository);
	const commentTask = await repository.getById(req.params.id);

	if (!commentTask) {
		res.status(HttpCodes.BAD_REQUEST).send(CREATE_ERRORS(ERRORS.NO_COMMENT_TASK));
	} else {
		req.commentTask = commentTask;
		next();
	}
};
