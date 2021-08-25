import { WebApi } from 'typings/webapi';

export const SUBMIT_SOLUTION = 'TASK:SUBMIT_SOLUTION';
export const FETCH_TASK = 'TASK:FETCH_TASK';
export const SET_TASK = 'TASK:SET_TASK';
export const FETCH_SOLUTION = 'TASK:FETCH_SOLUTION';
export const SET_SOLUTION = 'TASK:SET_SOLUTION';
export const START_LOADING = 'TASK:START_LOADING';
export const END_LOADING = 'TASK:END_LOADING';

export interface IFetchSolutionArgs {
	taskId: string;
}

export interface ISetSolutionArgs {
	solution: WebApi.Entities.ISolution;
}

export interface IFetchTaskArgs {
	id: string;
}

export interface ISetTaskArgs {
	task: WebApi.Entities.ITask;
}

export interface ISubmitSolutionArgs {
	taskId: string;
	code: string;
}
