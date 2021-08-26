import { WebApi } from '../../../typings/webapi';

export const GET_TASK = 'TASK:GET_TASK';
export const SET_TASK = 'TASK:SET_TASK';
export const SET_NOT_FOUND = 'TASK:SET_NOT_FOUND';
export const GET_TASKS = 'TASK:GET_TASKS';
export const SET_TASKS = 'TASK:SET_TASKS';

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
