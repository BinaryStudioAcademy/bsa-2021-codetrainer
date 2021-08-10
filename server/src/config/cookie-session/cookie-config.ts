import ms from 'ms';
import { ENV } from '../../common';

export const cookieConfig: CookieSessionInterfaces.CookieSessionOptions = {
	name: 'session',
	keys: [ENV.COOKIE.SECRET] as Array<string>,
	maxAge: ms('30d'),
	httpOnly: true,
	sameSite: 'none',
	secure: true,
};
