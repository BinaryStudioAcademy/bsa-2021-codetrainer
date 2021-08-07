import { Router } from 'express';
import { TaskApiPath } from '../../common';
import { taskIdSchema, taskSchema, validationMiddleware } from '../../middleware';
import { checkTaskIdMiddleware } from '../../middleware/check/task/task-id-middleware';
import { TaskService } from '../../services';

export const initTask = (appRouter: typeof Router, services: { task: TaskService }) => {
	const { task: taskService } = services;
	const router = appRouter();

	router
		.get(TaskApiPath.ROOT, (req, res, next) =>
			taskService
				.getTasks(req.body)
				.then((data) => res.send(data))
				.catch(next),
		)
		.post(TaskApiPath.ROOT, validationMiddleware([taskSchema]), (req, res, next) =>
			taskService
				.create(req.user, req.body)
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(TaskApiPath.$ID, validationMiddleware([taskIdSchema]), checkTaskIdMiddleware, (req, res, _next) =>
			res.send(req.task),
		)
		.put(
			TaskApiPath.$ID,
			validationMiddleware([taskIdSchema, taskSchema]),
			checkTaskIdMiddleware,
			(req, res, next) =>
				taskService
					.update(req.body, req.task.id)
					.then((data) => res.send(data))
					.catch(next),
		)
		.delete(TaskApiPath.$ID, validationMiddleware([taskIdSchema]), checkTaskIdMiddleware, (req, res, next) =>
			taskService
				.delete(req.user, req.body.id)
				.then((data) => res.send(data))
				.catch(next),
		);

	return router;
};
