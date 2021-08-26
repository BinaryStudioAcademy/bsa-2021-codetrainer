import { initialState, ITaskInfoState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';
import * as actionTypes from './action-types';

export const taskInfoReducer = createReducer<ITaskInfoState>(initialState, {
	[actionTypes.SET_TASK](state, action: actionTypes.TSetTask) {
		return {
			...state,
			task: action.task,
		};
	},
	[actionTypes.SET_NOT_FOUND](state, action: actionTypes.TSetNotFound) {
		return {
			...state,
			notFound: action.notFound,
		};
	},
	[actionTypes.SET_TASKS](state, action: actionTypes.TSetTasks) {
		return {
			...state,
			similarTasks: action.similarTasks,
		};
	},
});
