import ms from 'ms';
import { ENV } from '../../common';

export const cookieConfig = {
	name: ENV.COOKIE.NAME,
	keys: [ENV.COOKIE.SECRET] as Array<string>,
	cookie: {
		maxAge: ms(ENV.COOKIE.MAX_AGE),
		httpOnly: ENV.COOKIE.HTTP_ONLY,
	},
};
