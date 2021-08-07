import * as actionTypes from './action-types';
import { IClansState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const clansReducer = createReducer<IClansState>(initialState, {
	[actionTypes.ADD_CLANS](state, action: actionTypes.TAddArgs) {
		return {
			...state,
			items: [...state.items, ...action.clans],
		};
	},
	[actionTypes.UPDATE_CLAN](state, action: actionTypes.TUpdateArgs) {
		const updatedClan = action.clan;
		return {
			...state,
			items: state.items.map((clan) => (updatedClan.id === clan.id ? updatedClan : clan)),
		};
	},
	[actionTypes.SORT_BY_TIME](state, action) {
		return {
			...state,
			items: [...state.items].sort((a, b) => (new Date(b.createdAt) > new Date(a.createdAt) ? 1 : -1)),
		};
	},
	[actionTypes.SORT_BY_RANK](state, action) {
		return {
			...state,
			items: [...state.items].sort((a, b) => b.rank - a.rank),
		};
	},
	[actionTypes.SORT_BY_SIZE](state, action) {
		return {
			...state,
			items: [...state.items].sort((a, b) => b.maxMembers - a.maxMembers),
		};
	},
});
