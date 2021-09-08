import { WebApi } from 'typings/webapi';

export interface ITaskInfoState {
	task: WebApi.Entities.IChallenge | null;
	notFound: boolean;
	similarTasks: WebApi.Entities.IChallenge[] | null;
	nextTaskId: string | null;
	following: WebApi.Entities.IUser[] | null;
	comments: {
		numberOfComments: number;
		items: WebApi.Entities.ICommentTask[] | null;
		options: {
			page: number;
			itemsPerPage: number;
			hasNextPage: boolean;
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
		numberOfComments: 0,
		items: null,
		options: {
			page: 0,
			itemsPerPage: 10,
			hasNextPage: true,
		},
	},
};
