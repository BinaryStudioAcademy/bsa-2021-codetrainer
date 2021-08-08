import { Request, Response } from 'express';
import ms from 'ms';
import { User } from '../data';
import { ENV } from '../common';

const cookieExpires = () => new Date(Date.now() + ms(ENV.COOKIE.MAX_AGE));

export const setResponseSession = (
	req: Request,
	res: Response,
	data: { refreshToken: string; user?: User; token: string },
) => {
	const { refreshToken, ...restData } = data;
	req.sessionOptions.expires = cookieExpires();
	req.session = {
		...(req.session || {}),
		refreshToken,
	};
	res.send(restData);
};
