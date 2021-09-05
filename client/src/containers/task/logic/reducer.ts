import { initialState, ITaskInfoState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';
import * as actionTypes from './action-types';

export const taskInfoReducer = createReducer<ITaskInfoState>(initialState, {
	[actionTypes.SET_TASK](state, action: actionTypes.TSetTask) {
		return {
			...state,
			task: action.task,
			nextTaskId: null,
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
	[actionTypes.SET_NEXT_TASK](state, action: actionTypes.TSetNextTask) {
		return {
			...state,
			nextTaskId: action.nextTaskId,
		};
	},
	[actionTypes.SET_FOLLOWING](state, action: actionTypes.TSetFollowing) {
		return {
			...state,
			following: action.following,
		};
	},
});
