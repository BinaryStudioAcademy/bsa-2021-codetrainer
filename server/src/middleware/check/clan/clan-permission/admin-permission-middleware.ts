import { RequestHandler } from 'express';
import { CLAN_MEMBER_ROLE, CODE_ERRORS } from '../../../../common';
import { ValidationError } from '../../../../helpers';

const adminPermissionMiddleware: RequestHandler = (req, _response, next) => {
	const { user } = req;
	if (user.profileClan?.role !== CLAN_MEMBER_ROLE.ADMIN) {
		throw new ValidationError(CODE_ERRORS.CLAN_NOT_PERMISSION);
	}
	next();
};

export default adminPermissionMiddleware;
