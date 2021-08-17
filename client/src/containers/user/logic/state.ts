import { IUser } from 'typings/common/IUser';

export enum UserAccessToken {
	LOADING = 'loading',
	LOADED = 'loaded',
}

export interface IRequestError {
	error?: boolean;
	message?: string | null;
}

export interface IUserDataState {
	user: IUser | null;
	accessToken: UserAccessToken;
	requestError?: IRequestError;
}

export const initialState: IUserDataState = {
	user: null,
	accessToken: UserAccessToken.LOADING,
};
