import { WebApi } from 'typings/webapi';

export interface ITaskInfoState {
	task: WebApi.Entities.IChallenge | null;
	notFound: boolean;
	similarTasks: WebApi.Entities.IChallenge[] | null;
	nextTaskId: string | null;
	following: WebApi.Entities.IUser[] | null;
}

export const initialState: ITaskInfoState = {
	task: null,
	notFound: false,
	similarTasks: null,
	nextTaskId: null,
	following: null,
};
