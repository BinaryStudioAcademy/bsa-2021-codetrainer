import { Router } from 'express';
import { initAuth } from './auth';
import { ApiPath } from '../common';
import { auth } from '../services';

export const initApi = (appRouter: typeof Router) => {
	const apiRouter = appRouter();

	apiRouter.use(
		ApiPath.AUTH,
		initAuth(Router, {
			auth,
		}),
	);

	return apiRouter;
};
