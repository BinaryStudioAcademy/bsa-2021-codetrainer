import { Router } from 'express';
import { SolutionApiPath } from '../../../common';
import { validationMiddleware, checkSolutionIdMiddleware, solutionIdSchema, solutionSchema } from '../../../middleware';
import { SolutionService } from '../../../services';

export const initSolution = (appRouter: typeof Router, services: { solution: SolutionService }) => {
	const { solution: solutionService } = services;
	const router = appRouter();

	router
		.get(SolutionApiPath.ROOT, (_req, res, next) =>
			solutionService
				.getSolutions()
				.then((data) => res.send(data))
				.catch(next),
		)
		.post(SolutionApiPath.ROOT, validationMiddleware([solutionSchema]), (req, res, next) =>
			solutionService
				.create(req.user, req.task, req?.validData?.code)
				.then((data) => res.send(data))
				.catch(next),
		)
		.put(
			SolutionApiPath.$ID,
			validationMiddleware([solutionIdSchema, solutionSchema]),
			checkSolutionIdMiddleware,
			(req, res, next) =>
				solutionService
					.update(req.user, req.solution, req?.validData?.code)
					.then((data) => res.send(data))
					.catch(next),
		)
		.delete(
			SolutionApiPath.$ID,
			validationMiddleware([solutionIdSchema]),
			checkSolutionIdMiddleware,
			(req, res, next) =>
				solutionService
					.delete(req.user, req.solution)
					.then((data) => res.send(data))
					.catch(next),
		)
		.get(
			SolutionApiPath.$ID,
			validationMiddleware([solutionIdSchema]),
			checkSolutionIdMiddleware,
			(req, res, _next) => res.send(req.solution),
		);

	return router;
};
