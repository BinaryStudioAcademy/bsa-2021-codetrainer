import { Router } from 'express';
import { SOLUTION_STATUS, TaskApiPath } from '../../common';
import {
	taskIdSchema,
	taskSchema,
	validationMiddleware,
	checkTaskIdMiddleware,
	taskSearchSchema,
	taskWithSolutionsSchema,
} from '../../middleware';
import { TaskService } from '../../services';

export const initTask = (appRouter: typeof Router, services: { task: TaskService }) => {
	const { task: taskService } = services;
	const router = appRouter();

	router
		.get(TaskApiPath.SEARCH, validationMiddleware([taskSearchSchema]), (req, res, next) =>
			taskService
				.search(req.validData, req.user)
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(TaskApiPath.$ID, validationMiddleware([taskIdSchema]), checkTaskIdMiddleware, (req, res, _next) =>
			res.send(req.task),
		)
		.get(TaskApiPath.ROOT, (req, res, next) =>
			taskService
				.getTasks(req.validData || {})
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(TaskApiPath.USER_SOLUTIONS, validationMiddleware([taskWithSolutionsSchema]), (req, res, next) =>
			taskService
				.getTasksWithUserSolutions({
					userId: req.user.id,
					solutionStatus: req.query.status as SOLUTION_STATUS,
					skip: Number(req.query.skip) || 0,
					take: Number(req.query.take) || 10,
				})
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(TaskApiPath.NEXT_TASK, validationMiddleware([taskIdSchema]), checkTaskIdMiddleware, (req, res, next) =>
			taskService
				.getNextTask(req.user.id, req.task.id)
				.then((data) => res.send(data))
				.catch(next),
		)
		.put(
			TaskApiPath.$ID,
			validationMiddleware([taskIdSchema, taskSchema]),
			checkTaskIdMiddleware,
			(req, res, next) => {
				const { tags, ...restData } = req.validData;
				return taskService
					.update(restData, req.task.id, tags)
					.then((data) => res.send(data))
					.catch(next);
			},
		)
		.post(TaskApiPath.ROOT, validationMiddleware([taskSchema]), (req, res, next) =>
			taskService
				.create(req.user, req.validData, req.validData?.tags)
				.then((data) => res.send(data))
				.catch(next),
		)
		.delete(TaskApiPath.$ID, validationMiddleware([taskIdSchema]), checkTaskIdMiddleware, (req, res, next) =>
			taskService
				.delete(req.user, req.task)
				.then((data) => res.send(data))
				.catch(next),
		);

	return router;
};
