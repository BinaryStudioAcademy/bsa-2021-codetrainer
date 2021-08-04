import { Router } from 'express';
import { initAuth } from './auth';
import { initClan } from './clan';
import { ApiPath } from '../common';
import { auth, clan } from '../services';

export const initApi = (appRouter: typeof Router) => {
	const apiRouter = appRouter();

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

	return apiRouter;
};
