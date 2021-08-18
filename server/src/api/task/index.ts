import { Router } from 'express';
import { TaskApiPath } from '../../common';
import { taskService, solutionService } from '../../services';
import { validationMiddleware, checkTaskIdMiddleware, taskIdSchema } from '../../middleware';
import { initSolution } from './solution/solution-api';
import { initTask } from './task-api';

export function initTaskApi(): Router {
	const apiRouter = Router();

	apiRouter.use(TaskApiPath.ROOT, initTask(Router, { task: taskService }));
	apiRouter.use(
		TaskApiPath.TRAIN,
		validationMiddleware([taskIdSchema]),
		checkTaskIdMiddleware,
		initSolution(Router, { solution: solutionService }),
	);

	return apiRouter;
}
