import * as actionTypes from './action-types';
import { initialState, ISearchState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const searchReducer = createReducer<ISearchState>(initialState, {
	[actionTypes.SEARCH_ERROR](state, action: actionTypes.TSearchError) {
		return {
			...state,
			isLoading: false,
			errors: action.payload,
		};
	},
	[actionTypes.SEARCH_STATE_RESET](state) {
		return {
			...state,
			isLoading: false,
			isSuccess: false,
			errors: null,
		};
	},
	[actionTypes.SEARCH_BEFORE_FETCH](state) {
		return {
			...state,
			isLoading: true,
			isSuccess: false,
			errors: null,
		};
	},
	[actionTypes.SEARCH_SUCCESS](state) {
		return {
			...state,
			isLoading: false,
			isSuccess: true,
		};
	},
	[actionTypes.SEARCH_CHANGE_FILTER](state, action: actionTypes.TSearchChangeFilter) {
		return {
			...state,
			...action.partialFilter,
		};
	},
	[actionTypes.SEARCH_SET_DATA](state, action: actionTypes.TSearchSetData) {
		return {
			...state,
			search: action.payload,
		};
	},
});
