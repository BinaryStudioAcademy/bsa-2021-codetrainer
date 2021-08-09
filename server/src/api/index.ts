import { Router } from 'express';
import { initAuth } from './auth';
import { initClan } from './clan';
import { imagesController } from './images.controller';
import { initTask } from './task/task-api';
import { ApiPath } from '../common';
import { authService, clanService, imagesService, taskService } from '../services';

export function initApi(): Router {
	const apiRouter = Router();

	apiRouter.use(
		ApiPath.AUTH,
		initAuth(Router, {
			auth: authService,
		}),
	);

	apiRouter.use(
		ApiPath.CLAN,
		initClan(Router, {
			clan: clanService,
		}),
	);

	apiRouter.use(ApiPath.IMAGES, imagesController(imagesService));

	apiRouter.use(ApiPath.TASK, initTask(Router, { task: taskService }));

	return apiRouter;
}
