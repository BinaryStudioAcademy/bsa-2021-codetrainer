import { Router } from 'express';
import { initAuth } from './auth';
import { initClan } from './clan';
import { imagesRouter } from './images.router';
import { githubRouter } from './github.router';
import { initTask } from './task/task-api';
import { ApiPath } from '../common';
import { users, authService, clanService, imagesService, taskService, githubService } from '../services';
import { initUsers } from './users/users-api';

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

	apiRouter.use(
		ApiPath.USERS,
		initUsers(Router, {
			users,
		}),
	);

	apiRouter.use(ApiPath.IMAGES, imagesRouter(imagesService));

	apiRouter.use(
		ApiPath.AUTH + ApiPath.GITHUB,
		githubRouter({
			authService,
			githubService,
		}),
	);

	apiRouter.use(ApiPath.TASK, initTask(Router, { task: taskService }));

	return apiRouter;
}
