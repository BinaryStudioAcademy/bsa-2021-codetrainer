import { ENV } from '../enum';

const LOCAL_HOST = `http://localhost:${ENV.APP.PORT}/`;
export const STAGING_URL = 'https://staging.codetrain.xyz';

export const CORS_ORIGIN_URLS = [LOCAL_HOST, STAGING_URL];

export const CORS_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
export const CORS_CREDENTIALS = true;
