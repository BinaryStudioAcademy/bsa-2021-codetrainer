import { TypeTest } from 'constants/task';
import { ITestResult } from 'containers/task-train/logic/state';
import { WebApi } from 'typings/webapi';

export const SET_TASK = 'CREATE_TASK:SET_TASK';
export const SET_TASKS = 'CREATE_TASK:SET_TASKS';
export const CHANGE_TASK = 'CREATE_TASK:CHANGE_TASK';
export const ADD_TASK = 'CREATE_TASK:ADD_TASK';
export const LOAD_TASKS = 'CREATE_TASK:LOAD_TASKS';
export const ERRORS = 'CREATE_TASK:ERRORS';
export const SUCCESS = 'CREATE_TASK:SUCCESS';
export const LOADING = 'CREATE_TASK:LOADING';
export const SAVE_TASK = 'CREATE_TASK:SAVE_TASK';
export const TASK_VALIDATION = 'CREATE_TASK:TASK_VALIDATION';
export const SET_TEST_RESULT = 'CREATE_TASK:SET_TEST_RESULT';
export const FETCH_DELETE_TASK = 'CREATE_TASK:FETCH_DELETE_TASK';
export const DELETE_TASK = 'CREATE_TASK:DELETE_TASK';
export const PUBLISH_TASK = 'CREATE_TASK:PUBLISH_TASK';

export type TDeleteTask = {
	taskId: string;
};

export type TTaskValidation = {
	typeTest: TypeTest;
};

export type TLoading = {
	isLoading: boolean;
};

export type TSetTask = {
	task: Partial<WebApi.Entities.ITask>;
};

export type TSetTasks = {
	tasks: Partial<WebApi.Entities.ITask>[];
};

export type TChangeTask = {
	task: Partial<WebApi.Entities.ITask>;
};

export type TAddTask = {
	task: WebApi.Entities.ITask;
};

export type TErrors = {
	errors: string | null;
};

export type TSuccess = {
	success: string | null;
};

export type TSetTestResult = {
	testResult: ITestResult | null;
};
