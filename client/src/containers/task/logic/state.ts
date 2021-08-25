import { WebApi } from 'typings/webapi';

export interface ITaskState {
	task: WebApi.Entities.IChallenge | null;
	notFound: boolean;
}

export const initialState: ITaskState = {
	task: null,
	notFound: false,
};
