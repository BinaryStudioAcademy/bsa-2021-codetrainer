import * as actionTypes from './action-types';
import { ITaskState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const taskReducer = createReducer<ITaskState>(initialState, {
	[actionTypes.START_LOADING](state, action) {
		return {
			...state,
			hasFetched: false,
			errors: null,
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
	[actionTypes.SET_TEST](state, { test }: actionTypes.ISetTest) {
		return {
			...state,
			hasFetched: true,
			test,
		};
	},
	[actionTypes.SET_ACTIVE_TAB](state, { tab }: actionTypes.ISetActiveTAb) {
		return {
			...state,
			activeTab: tab,
		};
	},
	[actionTypes.ERRORS](state, { errors }: actionTypes.IErrors) {
		return {
			...state,
			errors,
		};
	},
});
