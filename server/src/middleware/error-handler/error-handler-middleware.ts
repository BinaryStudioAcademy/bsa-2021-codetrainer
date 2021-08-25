import { ErrorRequestHandler } from 'express';
import { HttpCodes } from '../../common';

export const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res, next) => {
	if (res.headersSent) {
		next(err);
	} else {
		console.error('err => ', err);
		const { status = HttpCodes.INTERNAL_SERVER_ERROR, message = '' } = err;
		res.status(status).send({ message });
	}
};
