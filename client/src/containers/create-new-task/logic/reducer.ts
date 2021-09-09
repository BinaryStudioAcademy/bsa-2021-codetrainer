import { initialState, ICreateTaskState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';
import * as actionTypes from './action-types';

export const createTaskReducer = createReducer<ICreateTaskState>(initialState, {
	[actionTypes.SET_TASK](state, { task }: actionTypes.TSetTask) {
		return {
			...state,
			task: task,
		};
	},
	[actionTypes.SET_TASKS](state, { tasks }: actionTypes.TSetTasks) {
		return {
			...state,
			tasks: tasks,
		};
	},
	[actionTypes.ADD_TASK](state, action: actionTypes.TAddTask) {
		const filter = state.tasks.filter((task) => task.id !== action.task.id);
		return {
			...state,
			tasks: [...filter, action.task],
		};
	},
	[actionTypes.DELETE_TASK](state, { taskId }: actionTypes.TDeleteTask) {
		return {
			...state,
			tasks: state.tasks.filter((task) => task.id !== taskId),
		};
	},
	[actionTypes.CHANGE_TASK](state, { task }: actionTypes.TChangeTask) {
		return {
			...state,
			task: { ...(state.task ?? {}), ...task },
		};
	},
	[actionTypes.ERRORS](state, { errors }: actionTypes.TErrors) {
		return {
			...state,
			errors,
		};
	},
	[actionTypes.SUCCESS](state, { success }: actionTypes.TSuccess) {
		return {
			...state,
			success,
		};
	},
	[actionTypes.LOADING](state, { isLoading }: actionTypes.TLoading) {
		return {
			...state,
			isLoading,
		};
	},
	[actionTypes.SET_TEST_RESULT](state, { testResult }: actionTypes.TSetTestResult) {
		return {
			...state,
			testResult,
			isLoading: false,
		};
	},
});
