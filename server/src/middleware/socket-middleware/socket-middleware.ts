import { RequestHandler } from 'express';
import { Server } from 'socket.io';

export const socketMiddleware =
	(io: Server): RequestHandler =>
	(req, _res, next) => {
		req.io = io;
		next();
	};
