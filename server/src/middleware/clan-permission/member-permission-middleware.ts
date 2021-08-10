import { RequestHandler } from 'express';
import { ValidationError } from '../../helpers';

const memberPermissionMiddleware: RequestHandler = (req, _response, next) => {
	const { user } = req;
	if (user.clan?.id !== req.params.id) {
		throw new ValidationError({ message: 'no permission', status: 401 });
	}
	next();
};

export default memberPermissionMiddleware;
