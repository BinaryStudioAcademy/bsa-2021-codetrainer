import { WebApi } from '../../../typings/webapi';

export const GET_TASK = 'TASK:GET_TASK';
export const SET_TASK = 'TASK:SET_TASK';
export const SET_NOT_FOUND = 'TASK:SET_NOT_FOUND';

export type TGetTask = {
	id: string;
};

export type TSetTask = {
	task: WebApi.Entities.ITask;
};

export type TSetNotFound = {
	notFound: boolean;
};
