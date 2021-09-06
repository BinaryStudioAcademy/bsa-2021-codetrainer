import { RequestHandler } from 'express';
import { CODE_ERRORS } from '../../../common';
import { ValidationError } from '../../../helpers';

export const authorPermissionMiddleware: RequestHandler = (req, _response, next) => {
	const user = req.user;
	const commentTask = req.commentTask;

	if (user.id !== commentTask.user.id) {
		throw new ValidationError(CODE_ERRORS.USER_NOT_AUTHOR);
	}

	next();
};
