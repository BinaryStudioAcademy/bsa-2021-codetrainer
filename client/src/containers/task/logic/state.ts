import { WebApi } from 'typings/webapi';

export interface ITaskInfoState {
	task: WebApi.Entities.IChallenge | null;
	notFound: boolean;
	similarTasks: WebApi.Entities.IChallenge[] | null;
	nextTaskId: string | null;
	following: WebApi.Entities.IUser[] | null;
	userSolution: {
		nextTaskId: string | null;
		solution?: WebApi.Entities.ISolution | null;
	};
	isLoading: boolean;
	stats: WebApi.Entities.IStats | null;
}

export const initialState: ITaskInfoState = {
	task: null,
	notFound: false,
	similarTasks: null,
	nextTaskId: null,
	following: null,
	userSolution: {
		nextTaskId: null,
		solution: null,
	},
	isLoading: false,
	stats: null,
};
