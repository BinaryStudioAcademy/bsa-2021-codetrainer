import { WebApi } from '../../../typings/webapi';

export const GET_TASK = 'CHALLENGE:GET_TASK';
export const SET_TASK = 'CHALLENGE:SET_TASK';
export const SET_NOT_FOUND = 'CHALLENGE:SET_NOT_FOUND';
export const GET_TASKS = 'CHALLENGE:GET_TASKS';
export const SET_TASKS = 'CHALLENGE:SET_TASKS';
export const GET_NEXT_TASK = 'CHALLENGE:GET_NEXT_TASK';
export const SET_NEXT_TASK = 'CHALLENGE:SET_NEXT_TASK';

export type TGetNextTask = {
	id?: string;
};

export type TSetNextTask = {
	nextTaskId: string;
};

export type TGetTasks = {
	rank: number;
	id: string;
};

export type TSetTasks = {
	similarTasks: WebApi.Entities.IChallenge[];
};

export type TGetTask = {
	id: string;
};

export type TSetTask = {
	task: WebApi.Entities.IChallenge;
};

export type TSetNotFound = {
	notFound: boolean;
};
