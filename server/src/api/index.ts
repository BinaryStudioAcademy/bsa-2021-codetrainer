import { Router } from 'express';
import { initAuth } from './auth';
import { initClan } from './clan';
import { ApiPath } from '../common';
import { auth, clan, githubService, imagesService } from '../services';
import { imagesRouter } from './images.router';
import { githubRouter } from './github.router';

export function initApi(): Router {
	const apiRouter = Router();

	apiRouter.use(
		ApiPath.AUTH,
		initAuth(Router, {
			auth,
		}),
	);

	apiRouter.use(
		ApiPath.CLAN,
		initClan(Router, {
			clan,
		}),
	);

	apiRouter.use(ApiPath.IMAGES, imagesRouter(imagesService));

	apiRouter.use(
		ApiPath.AUTH + ApiPath.GITHUB,
		githubRouter({
			auth,
			githubService,
		}),
	);

	return apiRouter;
}
