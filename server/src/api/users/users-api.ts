import { Router } from 'express';
import { REQ_TYPE, UsersApiPath } from '../../common';
import { userValidationMiddleware, SchemasUserDataValidation } from '../../middleware';
import { TUsersService } from '../../services';

export const initUsers = (appRouter: typeof Router, services: { users: TUsersService }) => {
	const { users: usersService } = services;
	const router = appRouter();

	router
		.get(UsersApiPath.LEADERBOARD, (req, res, next) =>
			usersService
				.getLeaders(req.query as unknown as { take: number; skip: number; nameQuery: string })
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(UsersApiPath.SEARCH, (req, res, next) =>
			usersService
				.search(req.query as { username: string })
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(UsersApiPath.GET_ALL, (req, res, next) =>
			usersService
				.getAllUsers()
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(UsersApiPath.GET_ONE, (req, res, next) =>
			usersService
				.getOne(req.params.id)
				.then((data) => res.send(data))
				.catch(next),
		)
		.put(
			UsersApiPath.UPDATE,
			userValidationMiddleware(SchemasUserDataValidation.userFieldsSchema, REQ_TYPE.BODY),
			(req, res, next) =>
				// TODO: add user id validation
				usersService
					.update(req.params.id, req.body)
					.then((data) => res.send(data))
					.catch(next),
		)
		.delete(UsersApiPath.DELETE, (req, res, next) =>
			usersService
				.delete(req.params.id, res)
				.then((data) => res.send(data))
				.catch(next),
		)
		.put(UsersApiPath.UPDATE_PASSWORD, (req, res, next) =>
			usersService
				.updatePassword(req.params.id, req.body)
				.then((data) => res.send(data))
				.catch(next),
		);
	return router;
};
