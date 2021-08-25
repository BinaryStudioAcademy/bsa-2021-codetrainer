import * as actionTypes from './action-types';
import { ITaskState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const taskReducer = createReducer<ITaskState>(initialState, {
	[actionTypes.START_LOADING](state, action) {
		return {
			...state,
			hasFetched: false,
		};
	},
	[actionTypes.END_LOADING](state, action) {
		return {
			...state,
			hasFetched: true,
		};
	},
	[actionTypes.SET_TASK](state, { task }: actionTypes.ISetTaskArgs) {
		return {
			...state,
			task,
		};
	},
	[actionTypes.SET_SOLUTION](state, { solution }: actionTypes.ISetSolutionArgs) {
		return {
			...state,
			solution,
		};
	},
});
