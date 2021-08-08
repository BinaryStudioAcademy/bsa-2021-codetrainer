import ms from 'ms';
import { ENV } from '../../common';

export const cookieConfig: CookieSessionInterfaces.CookieSessionOptions = {
	name: ENV.COOKIE.NAME,
	keys: [ENV.COOKIE.SECRET] as Array<string>,
	maxAge: ms(ENV.COOKIE.MAX_AGE),
	httpOnly: ENV.COOKIE.HTTP_ONLY,
	sameSite: 'none',
	secure: true,
};
