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
		messages: IMessage[] | null;
	};
	errors: string | null;
}

export const initialState: IHomeState = {
	state: {
		nextTask: null,
		community: null,
		messages: null,
	},
	errors: null,
};
