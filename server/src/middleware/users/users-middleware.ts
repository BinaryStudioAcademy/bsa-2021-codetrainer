import { RequestHandler } from 'express';
import { update } from './users-schema';

export const updateUserMiddleware: RequestHandler = (req, res, next) => {
	const schema = update();
	const isValidResult = schema.validate(req.body);

	if (isValidResult.error) {
		res.status(400).send({ error: isValidResult.error.details[0].message });
		return;
	}

	next();
};
