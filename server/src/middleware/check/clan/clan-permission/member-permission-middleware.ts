import { RequestHandler } from 'express';
import { CODE_ERRORS } from '../../../../common';
import { ValidationError } from '../../../../helpers';

const memberPermissionMiddleware: RequestHandler = (req, _response, next) => {
	const { user } = req;
	if (user.clan?.id !== req.params.id) {
		throw new ValidationError(CODE_ERRORS.CLAN_NOT_PERMISSION);
	}
	next();
};

export default memberPermissionMiddleware;
