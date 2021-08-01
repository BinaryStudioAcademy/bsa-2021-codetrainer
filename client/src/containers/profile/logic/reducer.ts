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
});
