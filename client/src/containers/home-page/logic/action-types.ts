import { IMessage } from '../types';

export const GET_TASKS = 'HOME:GET_TASKS';
export const SET_TASK = 'HOME:SET_TASK';
export const GET_MESSAGES = 'HOME:GET_MESSAGES';
export const SET_MESSAGES = 'HOME:SET_MESSAGES';

export type TGetTask = {
	discipline: string;
	currentTask?: string;
};

export type TSetTask = {
	task: {
		id: string;
		name: string;
		description: string;
		rank: number;
		tags: string[];
	};
};

export type TSetMessages = {
	messages: IMessage[];
};
