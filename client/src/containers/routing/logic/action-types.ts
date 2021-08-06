import { IAuthState } from './state';

export const AUTH_CHECK_TOKEN = 'AUTH:CHECK_TOKEN';
export const AUTH_USER = 'AUTH:USER';
export const AUTH_ACCESS_TOKEN_LOADING = 'AUTH:LOADING';
export const AUTH_LOGOUT = 'AUTH:LOGOUT';

export type TAuthUser = {
	user: IAuthState['user'];
};

export type TAuthAccessTokenLoading = {
	accessToken: IAuthState['accessToken'];
};
