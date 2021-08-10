import { RequestHandler } from 'express';
import { getCustomRepository } from 'typeorm';
import { HttpCodes, CREATE_ERRORS, ERRORS } from '../../../common';

import { TaskRepository } from '../../../data';

export const checkTaskIdMiddleware: RequestHandler = async (req, res, next) => {
	const repository = getCustomRepository(TaskRepository);
	const task = await repository.getById(req.body.id);
	if (!task) {
		res.status(HttpCodes.BAD_REQUEST).send(CREATE_ERRORS(ERRORS.NO_TASK));
	} else {
		req.task = task;
		next();
	}
};
