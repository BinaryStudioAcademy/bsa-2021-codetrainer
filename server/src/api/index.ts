import { Router } from 'express';
import { initAuth } from './auth';
import { initClan } from './clan';
import { ApiPath } from '../common';
import { auth, clan, follower } from '../services';
import { initFollower } from './follower';

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

	apiRouter.use(
		ApiPath.FOLLOWERS,
		initFollower(Router, {
			follower,
		}),
	);

	return apiRouter;
};
