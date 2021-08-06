import { Router } from 'express';
import { validationResult } from 'express-validator';
import { HttpCodes, TaskApiPath } from '../../common';
import { taskIdSchema, taskSchema, validationMiddleware } from '../../middleware';
import { TaskService } from '../../services';
import { IUserFields } from '../../types';

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
				.create(req.user as IUserFields, req.body)
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(TaskApiPath.$ID, validationMiddleware([taskIdSchema]), (req, res, next) =>
			taskService
				.getTaskById(req.body.id)
				.then((data) => res.send(data))
				.catch(next),
		)
		.put(TaskApiPath.$ID, validationMiddleware([taskIdSchema, taskSchema]), (req, res, next) =>
			taskService
				.update(req.user as IUserFields, req.body)
				.then((data) => res.send(data))
				.catch(next),
		)
		.delete(TaskApiPath.$ID, validationMiddleware([taskIdSchema]), (req, res, next) =>
			taskService
				.delete(req.user as IUserFields, req.body.id)
				.then((data) => res.send(data))
				.catch(next),
		);

	return router;
};
