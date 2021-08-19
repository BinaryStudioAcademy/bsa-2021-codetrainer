import { ENV } from '../enum';

export const STAGING_URL = 'https://staging.codetrain.xyz';

export const CORS_ORIGIN_URLS = [`http://localhost:${ENV.APP.PORT}/`, `http://localhost:${ENV.APP.PORT}`,  STAGING_URL];

export const CORS_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
export const CORS_CREDENTIALS = true;
