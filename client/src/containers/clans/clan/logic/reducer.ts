import * as actionTypes from './action-types';
import { IClanState, initialState, SortOptions } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const clanReducer = createReducer<IClanState>(initialState, {
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
	[actionTypes.SET_CLAN](state, { clan }: actionTypes.ISetClansArgs) {
		return {
			...state,
			data: clan,
		};
	},
	[actionTypes.ADD_ERROR](state, { error }: actionTypes.IAddErrorArgs) {
		return {
			...state,
			errors: [...state.errors, error],
		};
	},
	[actionTypes.CLEAR_CLAN](state, action) {
		return {
			...state,
			data: null,
		};
	},
	[actionTypes.SORT_MEMBERS_BY_TIME](state, action) {
		if (state.data) {
			return {
				...state,
				options: {
					...state.options,
					sortBY: SortOptions.BY_TIME,
				},
				data: {
					...state.data,
					members: [...state.data.members].sort((a, b) =>
						new Date(b.createdAt) > new Date(a.createdAt) ? 1 : -1,
					),
				},
			};
		}

		return state;
	},
	[actionTypes.SORT_MEMBERS_BY_RANK](state, action) {
		if (state.data) {
			return {
				...state,
				options: {
					...state.options,
					sortBY: SortOptions.BY_RANK,
				},
				data: {
					...state.data,
					members: [...state.data.members].sort((a, b) => b.rank - a.rank),
				},
			};
		}

		return state;
	},
});
