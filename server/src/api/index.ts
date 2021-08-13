import { Router } from 'express';
import { initAuth } from './auth';
import { initClan } from './clan';
import { imagesRouter } from './images.router';
import { githubRouter } from './github.router';
import { initTask } from './task/task-api';
import { ApiPath } from '../common';
import { initUsers } from './users/users-api';
import { initFollower } from './follower';
import { authService, clanService, imagesService, taskService, githubService, follower, users } from '../services';

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
		ApiPath.FOLLOWERS,
		initFollower(Router, {
			follower,
		}),
	);

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
