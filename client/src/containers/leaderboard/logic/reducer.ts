import * as actionTypes from './action-types';
import { ILeaderBoardState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const leaderBoardReducer = createReducer<ILeaderBoardState>(initialState, {
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
	[actionTypes.CLEAR_DATA](state, action) {
		return {
			...state,
			data: [],
		};
	},
	[actionTypes.ADD_USERS](state, { users, count }: actionTypes.IAddUsersArgs) {
		return {
			...state,
			data: users,
			count,
		};
	},
	[actionTypes.ADD_ERROR](state, { error }: actionTypes.IAddErrorArgs) {
		return {
			...state,
			errors: [...state.errors, error],
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
