import { Router } from 'express';
import { initAuth } from './auth';
import { initClan } from './clan';
import { imagesRouter } from './images.router';
import { githubRouter } from './github.router';
import { initTaskApi } from './task';
import { ApiPath } from '../common';
import { initUsers } from './users';
import { initFollower } from './follower';
import { initCollection } from './collection';
import { initTest } from './test/test-api';
import { initCommentTask } from './comment-task';
import {
	authService,
	clanService,
	imagesService,
	githubService,
	followersService,
	users,
	collectionService,
	commentTaskService,
	solutionService,
} from '../services';
import { initMailerApi } from './mailer';

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
			follower: followersService
		}),
	);

	apiRouter.use(
		ApiPath.COLLECTIONS,
		initCollection(Router, {
			collection: collectionService,
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

	apiRouter.use(ApiPath.TESTS, initTest(Router, { solution: solutionService }));

	apiRouter.use(ApiPath.COMMENT_TASK, initCommentTask(Router, { commentTask: commentTaskService }));

	apiRouter.use(ApiPath.MAILER, initMailerApi(Router));

	return apiRouter;
}
