import { WebApi } from 'typings/webapi';

export const START_LOADING = 'CLAN:START_LOADING';
export const FETCH_CLAN = 'CLAN:FETCH_CLAN';
export const END_LOADING = 'CLAN:END_LOADING';
export const SET_CLAN = 'CLAN:SET_CLAN';
export const CLEAR_CLAN = 'CLAN:CLEAR_CLAN';
export const ADD_ERROR = 'CLAN:ADD_ERROR';
export const LEAVE_CLAN = 'CLAN:LEAVE_CLAN';
export const SORT_MEMBERS_BY_TIME = 'CLAN:SORT_MEMBERS_BY_TIME';
export const SORT_MEMBERS_BY_RANK = 'CLAN:SORT_MEMBERS_BY_RANK';
export const DELETE_MEMBER = 'CLANS:DELETE_MEMBER';

export interface IDeleteMember {
	id: string;
}
export interface IFetchClanArgs {
	id: string;
}

export interface ISetClansArgs {
	clan: WebApi.Entities.IClan;
}

export interface IAddErrorArgs {
	error: string;
}
