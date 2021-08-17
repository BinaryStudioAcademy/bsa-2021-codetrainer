import * as actionTypes from './action-types';
import { IHomeState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const homeReducer = createReducer<IHomeState>(initialState, {
	[actionTypes.SET_TASK](state, action: actionTypes.TSetTask) {
		return {
			...state,
			state: {
				nextTask: action.task
			}
		};
	},
});

