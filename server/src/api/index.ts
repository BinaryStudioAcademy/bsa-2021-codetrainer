import { Router } from 'express';
import { initAuth } from './auth';
import { initClan } from './clan';
import { imagesController } from './images.controller';
import { ApiPath } from '../common';
import { auth, clan, follower, imagesService } from '../services';
import { initFollower } from './follower';

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

	apiRouter.use(
		ApiPath.FOLLOWERS,
		initFollower(Router, {
			follower,
		}),
	);

	apiRouter.use(ApiPath.IMAGES, imagesController(imagesService));

	return apiRouter;
}
