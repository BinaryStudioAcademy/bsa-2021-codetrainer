import { Router } from 'express';
import { initAuth } from './auth';
import { initClan } from './clan';
import { imagesRouter } from './images.router';
import { githubRouter } from './github.router';
import { initTaskApi } from './task';
import { ApiPath } from '../common';
import { initFollower } from './follower';
import { authService, clanService, imagesService, githubService, follower } from '../services';

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

	apiRouter.use(ApiPath.TASK, initTaskApi());

	return apiRouter;
}
