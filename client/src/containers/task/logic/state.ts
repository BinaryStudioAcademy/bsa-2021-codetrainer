import { WebApi } from 'typings/webapi';

export interface ITaskInfoState {
	task: WebApi.Entities.IChallenge | null;
	notFound: boolean;
	similarTasks: WebApi.Entities.IChallenge[] | null;
	nextTaskId: string | null;
	following: WebApi.Entities.IUser[] | null;
	comments: {
		items: WebApi.Entities.ICommentTask[] | null;
		options: {
			page: number;
			itemsPerPage: number;
		};
	};
}

export const initialState: ITaskInfoState = {
	task: null,
	notFound: false,
	similarTasks: null,
	nextTaskId: null,
	following: null,
	comments: {
		items: null,
		options: {
			page: 0,
			itemsPerPage: 10,
		},
	},
};
