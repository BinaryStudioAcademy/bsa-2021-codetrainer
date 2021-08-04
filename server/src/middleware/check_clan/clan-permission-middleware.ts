import { RequestHandler } from 'express';
import { IUserFields } from '../../types';
import { CLAN_MEMBER_ROLE } from '../../common';
import { ValidationError } from '../../helpers';

export const clanPermissionMiddleware: RequestHandler = (req, _response, next) => {
	const user = req.user as IUserFields;
	if (user.profileClan?.role !== CLAN_MEMBER_ROLE.ADMIN) {
		throw new ValidationError({ message: 'no permission', status: 401 });
	}
	next();
};
