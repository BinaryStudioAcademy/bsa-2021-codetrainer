import { initialState, ICreateTaskState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';
import * as actionTypes from './action-types';

export const createTaskReducer = createReducer<ICreateTaskState>(initialState, {
	[actionTypes.SET_TASK](state, action: actionTypes.TSetTaskArgs) {
		return {
			...state,
			taskId: action.taskId,
		};
	},
});
