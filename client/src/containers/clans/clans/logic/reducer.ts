import * as actionTypes from './action-types';
import { IClansState, initialState } from './state';
import { WebApi } from 'typings/webapi';
import { createReducer } from 'helpers/create-reducer.helper';

export const clansReducer = createReducer<IClansState>(initialState, {
	[actionTypes.START_LOADING](state, action) {
		return {
			...state,
			isLoading: true,
		};
	},
	[actionTypes.END_LOADING](state, action) {
		return {
			...state,
			isLoading: false,
		};
	},
	[actionTypes.CLEAR_CLANS](state, action) {
		return {
			...state,
			data: [],
		};
	},
	[actionTypes.ADD_CLANS](state, { clans, count }: actionTypes.IAddClansArgs) {
		return {
			...state,
			data: [...state.data, ...clans],
			count,
		};
	},
	[actionTypes.ADD_ERROR](state, { error }: actionTypes.IAddErrorArgs) {
		return {
			...state,
			errors: [...state.errors, error],
		};
	},
	[actionTypes.UPDATE_CLAN](state, { id, clan: updatedClan }: actionTypes.IUpdateClanArgs) {
		return {
			...state,
			data: state.data.map((clan: WebApi.Entities.IClan) => (clan.id === id ? updatedClan : clan)),
		};
	},
	[actionTypes.SET_ORDER_BY](state, action) {
		return {
			...state,
			options: {
				...state.options,
				orderBy: action.orderBy,
			},
		};
	},
	[actionTypes.SET_ORDER](state, action) {
		return {
			...state,
			options: {
				...state.options,
				order: action.order,
			},
		};
	},
	[actionTypes.SET_NAME_QUERY](state, action) {
		return {
			...state,
			options: {
				...state.options,
				nameQuery: action.nameQuery,
			},
		};
	},
	[actionTypes.SET_PAGE](state, action) {
		return {
			...state,
			options: {
				...state.options,
				page: action.page,
			},
		};
	},
	[actionTypes.SET_ITEMS_PER_PAGE](state, action) {
		return {
			...state,
			options: {
				...state.options,
				itemsPerPage: action.itemsPerPage,
			},
		};
	},
});
