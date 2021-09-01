import * as actionTypes from './action-types';
import { ITaskState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const taskReducer = createReducer<ITaskState>(initialState, {
	[actionTypes.LOAD_PAGE](state) {
		return {
			...state,
			nextTaskId: null,
			solution: null,
			activeTab: 0,
		};
	},
	[actionTypes.START_LOADING](state) {
		return {
			...state,
			hasFetched: false,
			isSuccess: true,
			changeStatus: false,
			test: null,
			errors: null,
		};
	},
	[actionTypes.END_LOADING](state) {
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
	[actionTypes.SET_NEXT_TASK_ID](state, { nextTaskId }: actionTypes.ISetNextTaskId) {
		return {
			...state,
			nextTaskId,
		};
	},
	[actionTypes.SET_SOLUTION](state, { solution }: actionTypes.ISetSolutionArgs) {
		return {
			...state,
			solution,
		};
	},
	[actionTypes.SET_TEST_RESULT](state, { testResult }: actionTypes.ISetTestResult) {
		return {
			...state,
			hasFetched: true,
			testResult,
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
			isSuccess: false,
		};
	},
	[actionTypes.CHANGE_STATUS](state, { changeStatus }: actionTypes.IChangeStatus) {
		return {
			...state,
			changeStatus,
		};
	},
});
