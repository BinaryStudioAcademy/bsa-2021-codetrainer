import { Router } from 'express';
import { AuthApiPath } from '../../common';
import { User } from '../../data';
import { setResponseSession } from '../../helpers';
import { authenticationMiddleware, registrationMiddleware } from '../../middleware';
import { AuthService } from '../../services';

export const initAuth = (appRouter: typeof Router, services: { auth: AuthService }) => {
	const { auth: authService } = services;
	const router = appRouter();

	router
		.post(AuthApiPath.LOGIN, authenticationMiddleware, (req, res, next) =>
			authService
				.login(req.user)
				.then((data) => setResponseSession(req, res, data))
				.catch(next),
		)
		.post(AuthApiPath.REGISTER, registrationMiddleware, (req, res, next) =>
			authService
				.register(req.user as Omit<User, 'id'>)
				.then((data) => setResponseSession(req, res, data))
				.catch(next),
		)
		.post(AuthApiPath.TOKEN_REFRESH, (req, res, next) =>
			authService
				.refreshToken(req.session?.refreshToken)
				.then((data) => setResponseSession(req, res, data))
				.catch(next),
		)
		.post(AuthApiPath.LOGOUT, (req, res, next) => {
			req.session = {
				...(req.session || {}),
				refreshToken: '',
			};
			res.send({ message: 'logout ok' });
		});

	return router;
};
