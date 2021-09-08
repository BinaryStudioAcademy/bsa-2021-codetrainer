import { ITestResult } from 'containers/task-train/logic/state';
import { NUMBER_OF_RANKS } from 'enum/ranks';
import { WebApi } from 'typings/webapi';
import { Discipline } from '../data';

export interface ICreateTaskState {
	task: Partial<WebApi.Entities.ITask>;
	tasks: Partial<WebApi.Entities.ITask>[];
	errors: string | null;
	success: string | null;
	isLoading: boolean;
	testResult: ITestResult | null;
}

export const taskInitialState: Partial<WebApi.Entities.ITask> = {
	id: '',
	discipline: Discipline.FUNDAMENTALS,
	testCases: '',
	exampleTestCases: '',
	description: '',
	completeSolution: '',
	initialSolution: '',
	name: '',
	tags: [],
	rank: NUMBER_OF_RANKS,
};

export const initialState: ICreateTaskState = {
	task: taskInitialState,
	tasks: [],
	errors: null,
	success: null,
	isLoading: false,
	testResult: null,
};
