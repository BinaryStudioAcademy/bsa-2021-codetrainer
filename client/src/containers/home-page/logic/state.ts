import { IMessage } from '../types';
import { ITag } from '../../../components/common/next-task/interface';

export interface IHomeState {
	state: {
		nextTask: {
			id: string;
			name: string;
			description: string;
			rank: number;
			tags: ITag[];
		} | null;
		messages: IMessage[] | null;
	};
}

export const initialState: IHomeState = {
	state: {
		nextTask: null,
		messages: null,
	},
};
