import { Router } from 'express';
import { UsersApiPath } from '../../common';
import { TUsers } from '../../services';
import { updateUserMiddleware } from '../../middleware';

export const initUsers = (appRouter: typeof Router, services: { users: TUsers }) => {
	const { users: usersService } = services;
	const router = appRouter();

	router
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
		.put(UsersApiPath.UPDATE, updateUserMiddleware, (req, res, next) =>
			// TODO: add user id validation
			usersService
				.update(req.params.id, req.body)
				.then((data) => res.send(data))
				.catch(next),
		)
		.delete(UsersApiPath.DELETE, (req, res, next) =>
			// TODO: add user id validation
			usersService
				.delete(req.params.id)
				.then((data) => res.send(data))
				.catch(next),
		);

	return router;
};
