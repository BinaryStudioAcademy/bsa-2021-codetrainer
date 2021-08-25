import { IMessage } from '../types';
import { ITag } from '../../../components/common/next-task/interface';
import { WebApi } from '../../../typings/webapi';

export const GET_TASKS = 'HOME:GET_TASKS';
export const SET_TASK = 'HOME:SET_TASK';
export const GET_MESSAGES = 'HOME:GET_MESSAGES';
export const SET_MESSAGES = 'HOME:SET_MESSAGES';
export const GET_COMMUNITY = 'HOME:GET_COMMUNITY';
export const SET_COMMUNITY = 'HOME:SET_COMMUNITY';

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
		tags: ITag[];
	};
};

export type TSetMessages = {
	messages: IMessage[];
};

export type TGetCommunity = {
	id: string;
};

export type TSetCommunity = {
	community: WebApi.Entities.IUser[];
};
