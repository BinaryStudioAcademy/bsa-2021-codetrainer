import { Order } from 'helpers/table-helper';
import { WebApi } from 'typings/webapi';
import { ClansOrderByOptions } from './state';
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

export const SET_ORDER_BY = 'CLANS:SET_ORDER_BY';
export const SET_ORDER = 'CLANS:SET_ORDER';
export const SET_NAME_QUERY = 'CLANS:SET_NAME_QUERY';


export interface IAddClansArgs {
	clans: WebApi.Entities.TClans;
}

export interface IUpdateClanArgs {
	id: string;
	clan: WebApi.Entities.IClan;
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

export interface ISetOrderByArgs {
	orderBy: ClansOrderByOptions;
}

export interface ISetOrderArgs {
	order: Order;
}

export interface ISetNameQueryArgs {
	nameQuery: string;
}