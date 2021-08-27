import { TypeTest } from 'constants/task';
import { SolutionStatus } from 'typings/common/solution';
import { WebApi } from 'typings/webapi';
import { ITaskState, ITest } from './state';

export const SUBMIT_SOLUTION = 'TASK:SUBMIT_SOLUTION';
export const ERRORS = 'TASK:ERRORS';
export const FETCH_TASK = 'TASK:FETCH_TASK';
export const SET_TASK = 'TASK:SET_TASK';
export const SET_SOLUTION = 'TASK:SET_SOLUTION';
export const START_LOADING = 'TASK:START_LOADING';
export const END_LOADING = 'TASK:END_LOADING';
export const SET_TEST = 'TASK:SET_TEST';
export const SET_ACTIVE_TAB = 'TASK:SET_ACTIVE_TAB';
export const PATCH_SOLUTION = 'TASK:PATCH_SOLUTION';

export interface ISetActiveTAb {
	tab: number;
}

export interface IPatchSolution {
	status?: SolutionStatus;
	code?: string;
	testCases?: string;
}

export interface IErrors {
	errors: ITaskState['errors'];
}

export interface ISetSolutionArgs {
	solution: WebApi.Entities.ISolution;
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

export interface ISetTest {
	test: ITest;
}
