import { Router } from 'express';
import { TestApiPath } from '../../common';
import { SolutionService } from '../../services';

export const initTest = (appRouter: typeof Router, services: { solution: SolutionService }) => {
	const { solution: solutionService } = services;
	const router = appRouter();

	router.post(TestApiPath.RESULT, (req, res, next) =>
		solutionService
			.setResult(req.body)
			.then((data) => res.send(data))
			.catch(next),
	);

	return router;
};
