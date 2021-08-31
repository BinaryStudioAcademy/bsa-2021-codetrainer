import { WebApi } from 'typings/webapi';

export const START_LOADING = 'LEADERBOARD:START_LOADING';
export const FETCH_USERS = 'LEADERBOARD:FETCH_USERS';
export const END_LOADING = 'LEADERBOARD:END_LOADING';
export const CLEAR_DATA = 'LEADERBOARD:CLEAR_DATA';
export const ADD_USERS = 'LEADERBOARD:ADD_USERS';
export const ADD_ERROR = 'LEADERBOARD:ADD_ERROR';

export const SET_NAME_QUERY = 'LEADERBOARD:SET_NAME_QUERY';
export const SET_PAGE = 'LEADERBOARD:SET_PAGE';
export const SET_ITEMS_PER_PAGE = 'LEADERBOARD:SET_ITEMS_PER_PAGE';

export interface IAddUsersArgs {
	users: WebApi.Entities.IUser[];
	count: number;
}

export interface IAddErrorArgs {
	error: string;
}

export interface ISetNameQueryArgs {
	nameQuery: string;
}

export interface ISetPageArgs {
	page: number;
}

export interface ISetItemsPerPageArgs {
	itemsPerPage: number;
}
