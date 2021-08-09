import { CorsOptions } from 'cors';
import { CORS_ORIGIN_URLS, CORS_METHODS, CORS_CREDENTIALS } from '../common';
import { cookieConfig } from './cookie-session/cookie-config';

export const corsConfig: CorsOptions = {
	origin: (origin, callback) => {
		if (CORS_ORIGIN_URLS.includes(origin as string) || !origin) {
			// if (origin !== STAGING_URL) {
			// 	delete cookieConfig.sameSite;
			// 	delete cookieConfig.secure;
			// }
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: CORS_METHODS,
	credentials: CORS_CREDENTIALS,
};
