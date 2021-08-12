import { RequestHandler } from 'express';
import { getCustomRepository } from 'typeorm';
import { HttpCodes, CREATE_ERRORS, ERRORS } from '../../../common';
import { SolutionRepository } from '../../../data';

export const checkSolutionIdMiddleware: RequestHandler = async (req, res, next) => {
	const repository = getCustomRepository(SolutionRepository);
	const solution = await repository.getByKey(req.params.idSolution, 'id');
	if (!solution) {
		res.status(HttpCodes.BAD_REQUEST).send(CREATE_ERRORS(ERRORS.NO_SOLUTION));
	} else {
		req.solution = solution;
		next();
	}
};
