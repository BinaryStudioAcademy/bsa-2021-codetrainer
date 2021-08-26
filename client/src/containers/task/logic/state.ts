import { WebApi } from 'typings/webapi';

export interface ITaskInfoState {
	task: WebApi.Entities.IChallenge | null;
	notFound: boolean;
}

export const initialState: ITaskInfoState = {
	task: null,
	notFound: false,
};
