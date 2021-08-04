import { RequestHandler } from 'express';
import { jwtMiddleware } from '../jwt';

export const authorizationMiddleware =
	(whiteList: Array<string>): RequestHandler =>
	(req, res, next) =>
		whiteList.some((route) => route === req.path) ? next() : jwtMiddleware(req, res, next);
