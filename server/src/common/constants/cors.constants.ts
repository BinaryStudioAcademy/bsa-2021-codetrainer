import { ENV } from '../enum';

export const STAGING_URL = 'https://staging.codetrain.xyz';
export const LOCAL_HOST_URL = `http://localhost:${ENV.APP.PORT}`;

export const CORS_ORIGIN_URLS = [`http://localhost:${ENV.APP.PORT}/`, LOCAL_HOST_URL, STAGING_URL];

export const CORS_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
export const CORS_CREDENTIALS = true;
