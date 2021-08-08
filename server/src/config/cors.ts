import { CorsOptions } from 'cors';
import { CORS_ORIGIN_URLS, STAGING_URL, CORS_METHODS, CORS_CREDENTIALS } from '../common';
import { cookieConfig } from './cookie-session/cookie-config';

export const corsConfig: CorsOptions = {
	origin: (origin, callback) => {
		if (CORS_ORIGIN_URLS.includes(origin as string)) {
			cookieConfig.secure = origin === STAGING_URL;
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: CORS_METHODS,
	credentials: CORS_CREDENTIALS,
};
