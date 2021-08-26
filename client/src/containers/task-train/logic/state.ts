import { WebApi } from 'typings/webapi';

export interface IResult {
	error?: string;
	response?: {
		stats: {
			failure: number;
			duration: number;
		};
	};
}

export interface ITaskState {
	task: WebApi.Entities.ITask | null;
	solution: WebApi.Entities.ISolution | null;
	hasFetched: boolean;
	result: IResult | null;
	success: boolean;
	activeTab: number;
}

export const initialState: ITaskState = {
	task: null,
	solution: null,
	hasFetched: false,
	result: null,
	success: false,
	activeTab: 0,
};
