import { Router } from 'express';
import { SEARCH_FOCUS_KEYS, SOLUTION_STATUS, TaskApiPath } from '../../common';
import {
	idSchema,
	taskSchema,
	validationMiddleware,
	checkTaskIdMiddleware,
	taskSearchSchema,
	taskWithSolutionsSchema,
	taskValidationSchema,
	taskSearchFocusSchema,
} from '../../middleware';
import { TaskService } from '../../services';
import { TypeTest } from '../../types';

export const initTask = (appRouter: typeof Router, services: { task: TaskService }) => {
	const { task: taskService } = services;
	const router = appRouter();

	router
		.get(TaskApiPath.NEXT_TASK, (req, res, next) =>
			taskService
				.getNextTask(req.user.id)
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(TaskApiPath.STATS, (req, res, next) =>
			taskService
				.getStats(req.params.id)
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(TaskApiPath.SEARCH, validationMiddleware([taskSearchSchema]), (req, res, next) =>
			taskService
				.search(req.validData, req.user)
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(TaskApiPath.$ID, validationMiddleware([idSchema]), checkTaskIdMiddleware, (req, res, _next) =>
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
		.get(TaskApiPath.USER_TASKS, (req, res, next) =>
			taskService
				.getUserTasks(req.user.id)
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(TaskApiPath.FOCUS, validationMiddleware([taskSearchFocusSchema]), (req, res, next) =>
			taskService
				.searchFocus(req.user, req.query.focus as SEARCH_FOCUS_KEYS)
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(TaskApiPath.TASK_PUBLISH, validationMiddleware([idSchema]), checkTaskIdMiddleware, (req, res, next) =>
			taskService
				.setPublish(req.task)
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(
			TaskApiPath.VALIDATION,
			validationMiddleware([taskValidationSchema]),
			checkTaskIdMiddleware,
			(req, res, next) =>
				taskService
					.validation(req.user.id, req.task, req.query.type as TypeTest)
					.then((data) => res.send(data))
					.catch(next),
		)
		.put(TaskApiPath.$ID, validationMiddleware([idSchema, taskSchema]), checkTaskIdMiddleware, (req, res, next) => {
			const { tags, ...restData } = req.validData;
			return taskService
				.update(restData, req.task.id, tags)
				.then((data) => res.send(data))
				.catch(next);
		})
		.post(TaskApiPath.ROOT, validationMiddleware([taskSchema]), (req, res, next) =>
			taskService
				.create(req.user, req.validData, req.validData?.tags)
				.then((data) => res.send(data))
				.catch(next),
		)
		.delete(TaskApiPath.$ID, validationMiddleware([idSchema]), checkTaskIdMiddleware, (req, res, next) =>
			taskService
				.delete(req.user, req.task)
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(TaskApiPath.SIMILAR_TASKS, (req, res, next) =>
			taskService
				.getSimilarTasks(req.params.id)
				.then((data) => res.send(data))
				.catch(next),
		);

	return router;
};
