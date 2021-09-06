import { RequestHandler } from 'express';
import { CLAN_MEMBER_ROLE, CODE_ERRORS } from '../../../../common';
import { ValidationError } from '../../../../helpers';
import { users } from '../../../../services';

const adminPermissionMiddleware: RequestHandler = async (req, _response, next) => {
	let user = null;
	if (req.params.id) {
		user = await users.getOne(req.params.id);
		user = user.user;
	} else {
		user = req.user;
	}
	if (user && !user.profileClan) {
		throw new ValidationError(CODE_ERRORS.USER_NO_CLAN);
	}
	if (user && user.profileClan?.role !== CLAN_MEMBER_ROLE.ADMIN) {
		throw new ValidationError(CODE_ERRORS.CLAN_NOT_PERMISSION);
	}
	next();
};

export default adminPermissionMiddleware;
