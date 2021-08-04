import { ErrorRequestHandler } from 'express';

export const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res, next) => {
	if (res.headersSent) {
		next(err);
	} else {
		console.error(err);
		const { status = 500, message = '' } = err;
		res.status(status).send({ status, message });
	}
};
