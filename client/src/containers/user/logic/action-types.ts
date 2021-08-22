import { WebApi } from 'typings/webapi';
import { IUserDataState } from './state';

export const SET_USER = 'USER:SET_USER';
export const USER_CHECK_TOKEN = 'USER:CHECK_TOKEN';
export const USER_ACCESS_TOKEN_LOADING = 'USER:LOADING';
export const USER_LOGOUT = 'USER:LOGOUT';
export const ADD_TASK = 'USER:ADD_TASK';
export const DELETE_TASK = 'USER:DELETE_TASK';
export const SET_USER_CLAN = 'USER:SET_USER_CLAN';

export type TSetUser = {
	user: IUserDataState['user'];
};

export type TUserAccessTokenLoading = {
	accessToken: IUserDataState['accessToken'];
};

export type TUserAddTask = {
	task: WebApi.Entities.ITask;
};

export type TUserDeleteTask = {
	task: WebApi.Entities.ITask;
};

export type TSetUserClan = {
	clan: WebApi.Entities.IClan | null;
};
