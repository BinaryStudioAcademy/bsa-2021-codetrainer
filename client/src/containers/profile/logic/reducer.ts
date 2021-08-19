import { initialState, IProfileState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';
import * as actionTypes from './action-types';

export const profileReducer = createReducer<IProfileState>(initialState, {
	[actionTypes.SET_ACTIVE_TAB](state, action: actionTypes.TSetActiveTabArgs) {
		return {
			...state,
			activeTab: action.activeTab,
		};
	},

	[actionTypes.SEARCH_ERROR](state, action: actionTypes.TSearchError) {
		return {
			...state,
			isLoading: false,
			errors: action.payload,
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

	[actionTypes.SEARCH_SET_DATA](state, action: actionTypes.TSearchSetData) {
		return {
			...state,
			user: action.data,
		};
	},
	[actionTypes.SEARCH_SET_SUBMIT](state, action: actionTypes.TSearchSetSubmit) {
		return {
			...state,
			onSubmit: action.payload,
		};
	},
});
