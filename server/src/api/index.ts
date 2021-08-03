import { Router } from 'express';
import { initAuth } from './auth';
import { imagesController } from './images.controller';
import { ApiPath } from '../common';
import { auth, imagesService } from '../services';

export function initApi(): Router {
	const apiRouter = Router();

	apiRouter.use(
		ApiPath.AUTH,
		initAuth(Router, {
			auth,
		}),
	);

	apiRouter.use(
		ApiPath.IMAGES,
		imagesController(imagesService)
	);

	return apiRouter;
};
