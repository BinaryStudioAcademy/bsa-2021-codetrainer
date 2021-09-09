import { IMessage } from '../types';
import { ITag } from '../../../components/common/next-task/interface';
import { WebApi } from '../../../typings/webapi';

export const GET_TASKS = 'HOME:GET_TASKS';
export const SET_TASK = 'HOME:SET_TASK';
export const SET_DATA_BEFORE_LOAD = 'HOME:SET_DATA_BEFORE_LOAD';
export const GET_MESSAGES = 'HOME:GET_MESSAGES';
export const SET_MESSAGES = 'HOME:SET_MESSAGES';
export const SET_ERRORS = 'HOME:SET_ERRORS';
export const GET_COMMUNITY = 'HOME:GET_COMMUNITY';
export const SET_COMMUNITY = 'HOME:SET_COMMUNITY';
export const GET_FOCUS_TASK = 'HOME:GET_FOCUS_TASK';
export const SET_PAGE = 'HOME:SET_PAGE';

export type TGetFocusTask = {
	discipline: string;
};

export type TGetMessages = {
	skip: number;
	take: number;
	isLoadPage?: boolean;
};

export type TSetPage = {
	page: number;
};

export type TSetErrors = {
	errors: string | null;
};

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
	} | null;
};

export type TSetMessages = {
	messages: IMessage[];
	messagesCount: number;
};

export type TGetCommunity = {
	id: string;
};

export type TSetCommunity = {
	community: WebApi.Entities.IUser[];
};
