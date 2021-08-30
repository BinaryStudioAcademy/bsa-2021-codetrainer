import { TypeTest } from 'constants/task';
import { WebApi } from 'typings/webapi';

export interface ITestResponseElement {
	currentRetry: number;
	duration: number;
	err: {
		message?: string;
	};
	fullTitle: string;
	title: string;
}

export interface ITestResult {
	result: {
		success?: boolean;
		error?: string;
		response?: {
			stats: {
				passes: number;
				pending: number;
				suites: number;
				failures: number;
				duration: number;
			};
			failures: ITestResponseElement[];
			passes: ITestResponseElement[];
		};
	};
	typeTest: TypeTest;
}

export interface ITaskState {
	task: WebApi.Entities.IChallenge | null;
	solution: WebApi.Entities.ISolution | null;
	nextTaskId: string | null;
	changeStatus: boolean;
	errors: unknown | null;
	hasFetched: boolean;
	testResult: ITestResult | null;
	activeTab: number;
}

export const initialState: ITaskState = {
	task: null,
	solution: null,
	nextTaskId: null,
	changeStatus: false,
	hasFetched: false,
	errors: null,
	testResult: null,
	activeTab: 0,
};
