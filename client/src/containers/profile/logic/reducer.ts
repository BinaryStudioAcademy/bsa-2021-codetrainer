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

	[actionTypes.SEARCH_USER_ERROR](state, action: actionTypes.TSearchError) {
		return {
			...state,
			isLoading: false,
			error: action.payload,
		};
	},
	[actionTypes.CLEAR_DATA](state) {
		return initialState;
	},
	[actionTypes.SEARCH_USER_SUCCESS](state, action: actionTypes.TSearchSetData) {
		return {
			...state,
			isLoading: false,
			isSuccess: true,
			userData: action.user,
		};
	},
});
