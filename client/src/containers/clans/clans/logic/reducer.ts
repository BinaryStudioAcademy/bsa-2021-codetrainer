import * as actionTypes from './action-types';
import { IClansState, initialState } from './state';
import { IClan } from '../../types';
import { createReducer } from 'helpers/create-reducer.helper';
import { SortOptions } from './state';

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
	[actionTypes.ADD_CLANS](state, { clans }: actionTypes.IAddClansArgs) {
		return {
			...state,
			data: [...state.data, ...clans],
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
			data: state.data.map((clan: IClan) => (clan.id === id ? updatedClan : clan)),
		};
	},
	[actionTypes.SORT_BY_TIME](state, action) {
		return {
			...state,
			options: {
				...state.options,
				sortBy: SortOptions.BY_TIME,
			},
			data: [...state.data].sort((a, b) => (new Date(b.createdAt) > new Date(a.createdAt) ? 1 : -1)),
		};
	},
	[actionTypes.SORT_BY_RANK](state, action) {
		return {
			...state,
			options: {
				...state.options,
				sortBy: SortOptions.BY_RANK,
			},
			data: [...state.data].sort((a, b) => b.rank - a.rank),
		};
	},
	[actionTypes.SORT_BY_SIZE](state, action) {
		return {
			...state,
			options: {
				...state.options,
				sortBy: SortOptions.BY_SIZE,
			},
			data: [...state.data].sort((a, b) => b.maxMembers - a.maxMembers),
		};
	},
});
