import * as actionTypes from './action-types';
import { initialState, ISidebarState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const sidebarReducer = createReducer<ISidebarState>(initialState, {
	[actionTypes.SET_TASK](state, action: actionTypes.TSetTask) {
		return {
			...state,
			taskId: action.taskId,
		};
	},
});
