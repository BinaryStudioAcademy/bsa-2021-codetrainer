import { IUser } from 'typings/webapi';

export enum UserAccessToken {
	LOADING = 'loading',
	LOADED = 'loaded',
}

export interface IUserDataState {
	user: IUser | null;
	accessToken: UserAccessToken;
}

export const initialState: IUserDataState = {
	user: null,
	accessToken: UserAccessToken.LOADING,
};
