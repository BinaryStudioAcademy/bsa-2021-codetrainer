import { Router } from 'express';
import { SOCKET_EVENTS, TestApiPath } from '../../common';
import { SolutionService } from '../../services';
import { sockets } from '../../socket';

export const initTest = (appRouter: typeof Router, services: { solution: SolutionService }) => {
	const { solution: solutionService } = services;
	const router = appRouter();

	router.post(TestApiPath.RESULT, (req, res, next) =>
		solutionService
			.setResult(req.body)
			.then(({ userId, user, result }) => {
				req.io
					.to(sockets.get(userId) || '')
					.emit(SOCKET_EVENTS.RESULT_TEST_TO_CLIENT, { resultTest: result, user });
				res.send({ message: 'ok' });
			})
			.catch(next),
	);

	return router;
};
