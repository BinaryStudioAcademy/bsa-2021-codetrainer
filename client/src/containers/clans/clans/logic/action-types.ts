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
export const UPDATE_CLAN = 'CLANS:UPDATE_CLAN';

export const SET_ORDER_BY = 'CLANS:SET_ORDER_BY';
export const SET_ORDER = 'CLANS:SET_ORDER';
export const SET_NAME_QUERY = 'CLANS:SET_NAME_QUERY';
export const SET_PAGE = 'CLANS:SET_PAGE';
export const SET_ITEMS_PER_PAGE = 'CLANS:SET_ITEMS_PER_PAGE';

export interface IAddClansArgs {
	clans: WebApi.Entities.TClans;
	count: number;
}

export interface IUpdateClanArgs {
	id: string;
	clan: WebApi.Entities.IClan;
}

export interface IFetchClanArgs {
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

export interface ISetPageArgs {
	page: number;
}

export interface ISetItemsPerPageArgs {
	itemsPerPage: number;
}
