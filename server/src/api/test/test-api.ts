import { Router } from 'express';
import { SOCKET_EVENTS, TestApiPath } from '../../common';
import { SolutionService, TaskService } from '../../services';
import { sockets } from '../../socket';

export const initTest = (appRouter: typeof Router, services: { solution: SolutionService; task: TaskService }) => {
	const { solution: solutionService, task: taskService } = services;
	const router = appRouter();

	router.post(TestApiPath.RESULT_SOLUTION, (req, res, next) =>
		solutionService
			.setResult(req.body)
			.then(async ({ result, typeTest, solution, user, userId }) => {
				req.io.to(sockets.get(userId) || '').emit(SOCKET_EVENTS.SOLUTION_RESULT, {
					result,
					typeTest,
					solution,
					user,
				});
				res.send({ message: 'ok' });
			})
			.catch(next),
	);

	router.post(TestApiPath.RESULT_TASK, (req, res, next) =>
		taskService
			.setValidation(req.body)
			.then(async ({ result, task, userId }) => {
				req.io.to(sockets.get(userId) || '').emit(SOCKET_EVENTS.TASK_RESULT, {
					result,
					task,
				});
				res.send({ message: 'ok' });
			})
			.catch(next),
	);

	return router;
};
