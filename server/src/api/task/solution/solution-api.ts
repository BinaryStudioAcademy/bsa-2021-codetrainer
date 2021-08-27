import { Router } from 'express';
import { SolutionApiPath } from '../../../common';
import { validationMiddleware, checkSolutionIdMiddleware, solutionIdSchema, solutionSchema } from '../../../middleware';
import { solutionPatchSchema } from '../../../middleware/validation/solution-validation';
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
				.create({ user: req.user, task: req.task, ...req.validData })
				.then((data) => res.send(data))
				.catch(next),
		)
		.put(
			SolutionApiPath.$ID,
			validationMiddleware([solutionIdSchema, solutionSchema]),
			checkSolutionIdMiddleware,
			(req, res, next) =>
				solutionService
					.update({ user: req.user, task: req.task, solution: req.solution, ...req.validData })
					.then((data) => res.send(data))
					.catch(next),
		)
		.patch(
			SolutionApiPath.$ID,
			validationMiddleware([solutionIdSchema, solutionPatchSchema]),
			checkSolutionIdMiddleware,
			(req, res, next) =>
				solutionService
					.patch({ user: req.user, task: req.task, solution: req.solution, ...req.validData })
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
		.get(SolutionApiPath.USER, (req, res, next) =>
			solutionService
				.getUserSolution(req.user, req.task)
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(
			SolutionApiPath.$ID,
			validationMiddleware([solutionIdSchema]),
			checkSolutionIdMiddleware,
			(req, res, next) => res.send(req.solution),
		);

	return router;
};
