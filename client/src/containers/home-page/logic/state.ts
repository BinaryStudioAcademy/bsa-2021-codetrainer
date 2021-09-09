import { IMessage } from '../types';
import { ITag } from '../../../components/common/next-task/interface';
import { WebApi } from '../../../typings/webapi';

export interface IHomeState {
	state: {
		nextTask: {
			id: string;
			name: string;
			description: string;
			rank: number;
			tags: ITag[];
		} | null;
		community: WebApi.Entities.IUser[] | null;
		messages: IMessage[];
		messagesCount: number;
		messagesOnPage: number;
		page: number;
	};
	errors: string | null;
}

export const initialState: IHomeState = {
	state: {
		nextTask: null,
		community: null,
		messages: [],
		messagesCount: 0,
		messagesOnPage: 10,
		page: 1,
	},
	errors: null,
};
