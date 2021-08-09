import { Router } from 'express';
import { AuthApiPath } from '../../common';
import { mailer, IMessageMailer } from '../../helpers/mailer';
import { GET_MAILER_TEXTS } from '../../data/mailer-texts';
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
		.post(AuthApiPath.REGISTER, registrationMiddleware, (req, res, next) => {
			authService
				.register(req.user as Omit<User, 'id'>)
				.then((data) => {
					if (data.user) {
						const { name, surname } = data.user;
						if (!name || !surname) {
							res.send(data);
						} else {
							const message: IMessageMailer = {
								to: data.user.email,
								subject: 'Thank you for registration on Codetrainer!',
								html: GET_MAILER_TEXTS.ON_SIGNUP(name, surname),
							};
							mailer(message);
						}
					}
					setResponseSession(req, res, data)
				})
				.catch(next)}
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
