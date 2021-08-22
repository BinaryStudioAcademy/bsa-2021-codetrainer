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
	[actionTypes.SEARCH_BEFORE_FETCH_NEXT_PAGE](state) {
		return {
			...state,
			changePage: false,
			isSuccess: false,
			errors: null,
		};
	},
	[actionTypes.SEARCH_CHANGE_PAGE](state) {
		return {
			...state,
			changePage: true,
			filter: {
				...state.filter,
				page: state.filter.page + 1,
			},
		};
	},
	[actionTypes.SEARCH_BEFORE_FETCH](state) {
		return {
			...state,
			isLoading: true,
			isSuccess: false,
			errors: null,
			onSubmit: false,
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
			filter: {
				...state.filter,
				...action.partialFilter,
			},
		};
	},
	[actionTypes.SEARCH_SET_DATA](state, action: actionTypes.TSearchSetData) {
		return {
			...state,
			search: action.data,
		};
	},
	[actionTypes.SEARCH_ADD_DATA_NEXT_PAGE](state, action: actionTypes.TSearchSetData) {
		return {
			...state,
			search: {
				...action.data,
				tasks: [...(state.search?.tasks || []), ...(action.data?.tasks || [])],
			},
		};
	},
	[actionTypes.SEARCH_ON_SUBMIT](state) {
		return {
			...state,
			onSubmit: true,
			filter: {
				...state.filter,
				page: 0,
			},
		};
	},
});
