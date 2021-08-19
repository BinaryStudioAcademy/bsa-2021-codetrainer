import * as actionTypes from './action-types';
import { IHomeState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const homeReducer = createReducer<IHomeState>(initialState, {
	[actionTypes.SET_TASK](state, action: actionTypes.TSetTask) {
		return {
			...state,
			state: {
				...state.state,
				nextTask: action.task,
			},
		};
	},

	[actionTypes.SET_MESSAGES](state, action: actionTypes.TSetMessages) {
		return {
			...state,
			state: {
				...state.state,
				messages: action.messages,
			},
		};
	},
});
