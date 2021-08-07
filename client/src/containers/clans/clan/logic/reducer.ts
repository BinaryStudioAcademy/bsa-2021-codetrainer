import * as actionTypes from './action-types';
import { IClanState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const clanReducer = createReducer<IClanState>(initialState, {
	[actionTypes.SET_CLAN](state, action: actionTypes.TSetArgs) {
		return {
			item: {
				...action.clan,
			},
		};
	},
	[actionTypes.SORT_MEMBERS_BY_TIME](state, action) {
		return {
			item: {
				...state.item,
				members: [...state.item.members].sort((a, b) =>
					new Date(b.createdAt) > new Date(a.createdAt) ? 1 : -1,
				),
			},
		};
	},
	[actionTypes.SORT_MEMBERS_BY_RANK](state, action) {
		return {
			item: {
				...state.item,
				members: [...state.item.members].sort((a, b) => b.rank - a.rank),
			},
		};
	},
});
