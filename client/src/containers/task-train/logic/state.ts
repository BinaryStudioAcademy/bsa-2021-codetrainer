import { WebApi } from 'typings/webapi';

export interface ITaskState {
	task: WebApi.Entities.ITask | null;
	solution: WebApi.Entities.ISolution | null;
	hasFetched: boolean;
}

export const initialState: ITaskState = {
	task: null,
	solution: null,
	hasFetched: false,
};
