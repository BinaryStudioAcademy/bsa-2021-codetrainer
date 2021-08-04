import { Router } from 'express';
import { AuthApiPath } from '../../common';
import { mailer,IMessageMailer } from '../../helpers/mailer';
import { authenticationMiddleware, registrationMiddleware } from '../../middleware';
import { TAuthService } from '../../services';
import { IUserFields } from '../../types';

export const initAuth = (appRouter: typeof Router, services: { auth: TAuthService }) => {
	const { auth: authService } = services;
	const router = appRouter();

	router
		.post(AuthApiPath.LOGIN, authenticationMiddleware, (req, res, next) =>
			authService
				.login(req.user as IUserFields)
				.then((data) => res.send(data))
				.catch(next),
		)
		.post(AuthApiPath.REGISTER, registrationMiddleware, (req, res, next) =>{
			authService
			.register(req.user as Omit<IUserFields, 'id'>)
			.then((data) => {
				if(data.user){
					const message:IMessageMailer = {
						to: data.user.email,
						subject: 'Thank you for registration on Codetrainer!',
						text: `Thank you, ${data.user.name} ${data.user.surname}, for registration on Codetrainer!
						Hope you will learn a lot of new things!
						
						This letter doesn't need a reply.`
					}
					mailer(message);
				}
				res.send(data)
			})
			.catch(next)
		}
			
		);

	return router;
};
