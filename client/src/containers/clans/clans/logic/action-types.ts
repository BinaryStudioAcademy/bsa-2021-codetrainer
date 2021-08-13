import { TClans, IClan } from '../../types';

export const START_LOADING = 'CLANS:START_LOADING';
export const FETCH_CLANS = 'CLANS:FETCH_CLANS';
export const FETCH_CLAN = 'CLANS:FETCH_CLAN';
export const END_LOADING = 'CLANS:END_LOADING';
export const CLEAR_CLANS = 'CLANS:CLEAR_CLANS';
export const ADD_CLANS = 'CLANS:ADD_CLANS';
export const ADD_ERROR = 'CLANS:ADD_ERROR';
export const JOIN_CLAN = 'CLANS:JOIN_CLAN';
export const LEAVE_CLAN = 'CLANS:LEAVE_CLAN';
export const UPDATE_CLAN = 'CLANS:UPDATE_CLAN';
export const SORT_BY_TIME = 'CLANS:SORT_BY_TIME';
export const SORT_BY_RANK = 'CLANS:SORT_BY_RANK';
export const SORT_BY_SIZE = 'CLANS:SORT_BY_SIZE';

export interface IAddClansArgs {
	clans: TClans;
}

export interface IUpdateClanArgs {
	id: string;
	clan: IClan;
}

export interface IFetchClanArgs {
	id: string;
}

export interface IJoinClanArgs {
	id: string;
}

export interface ILeaveClanArgs {
	id: string;
}

export interface IAddErrorArgs {
	error: string;
}
