import { CorsOptions } from 'cors';
import { CORS_ORIGIN_URLS, STAGING_URL, CORS_METHODS, CORS_CREDENTIALS, PROD_URL } from '../common';
import { cookieConfig } from './cookie-session/cookie-config';

export const corsConfig: CorsOptions = {
	origin: (origin, callback) => {
		if (CORS_ORIGIN_URLS.includes(origin as string) || !origin) {
			if (![STAGING_URL, PROD_URL].includes(origin as string)) {
				delete cookieConfig.sameSite;
				delete cookieConfig.secure;
			}
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: CORS_METHODS,
	credentials: CORS_CREDENTIALS,
};
