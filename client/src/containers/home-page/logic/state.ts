import { IMessage } from '../types';

export interface IHomeState {
	state: {
		nextTask: {
			id: string;
			name: string;
			description: string;
			rank: number;
			tags: string[];
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
