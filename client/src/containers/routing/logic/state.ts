import { IUser } from 'typings/sign-in-form';

export enum AuthAccessToken {
	LOADING = 'loading',
	LOADED = 'loaded',
}

export interface IAuthState {
	user: IUser | null;
	accessToken: AuthAccessToken;
}

export const initialState: IAuthState = {
	user: null,
	accessToken: AuthAccessToken.LOADING,
};
