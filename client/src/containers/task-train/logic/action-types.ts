import { TypeTest } from 'constants/task';
import { SolutionStatus } from 'typings/common/solution';
import { WebApi } from 'typings/webapi';
import { ITaskState, ITestResult } from './state';

export const SUBMIT_SOLUTION = 'TASK:SUBMIT_SOLUTION';
export const ERRORS = 'TASK:ERRORS';
export const FETCH_TASK = 'TASK:FETCH_TASK';
export const SET_TASK = 'TASK:SET_TASK';
export const SET_NEXT_TASK_ID = 'TASK:SET_NEXT_TASK_ID';
export const SET_SOLUTION = 'TASK:SET_SOLUTION';
export const START_LOADING = 'TASK:START_LOADING';
export const LOAD_PAGE = 'TASK:LOAD_PAGE';
export const CHANGE_STATUS = 'TASK:CHANGE_STATUS';
export const END_LOADING = 'TASK:END_LOADING';
export const SET_TEST_RESULT = 'TASK:SET_TEST_RESULT';
export const SET_ACTIVE_TAB = 'TASK:SET_ACTIVE_TAB';
export const PATCH_SOLUTION = 'TASK:PATCH_SOLUTION';

export interface ISetActiveTAb {
	tab: number;
}

export interface IChangeStatus {
	changeStatus: boolean;
}

export interface ISetNextTaskId {
	nextTaskId: string | null;
}

export interface IPatchSolution {
	taskId: string;
	code: string;
	testCases: string;
	status?: SolutionStatus;
}

export interface IErrors {
	errors: ITaskState['errors'];
}

export interface ISetSolutionArgs {
	solution: WebApi.Entities.ISolution | null;
}

export interface IFetchTaskArgs {
	id: string;
}

export interface ISetTaskArgs {
	task: WebApi.Entities.IChallenge;
}

export interface ISubmitSolutionArgs {
	taskId: string;
	testCases: string;
	code: string;
	typeTest: TypeTest;
}

export interface ISetTestResult {
	testResult: ITestResult;
}
