import { WebApi } from 'typings/webapi';

export enum UserAccessToken {
	LOADING = 'loading',
	LOADED = 'loaded',
}

export interface IUserDataState {
	user: WebApi.Entities.IUser | null;
	accessToken: UserAccessToken;
}

export const initialState: IUserDataState = {
	user: null,
	accessToken: UserAccessToken.LOADING,
};
