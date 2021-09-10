import { WebApi } from 'typings/webapi';
export const FETCH_COLLECTIONS = 'COLLECTIONS:FETCH_COLLECTIONS';
export const SET_COLLECTIONS = 'COLLECTIONS:SET_COLLECTIONS';
export const START_LOADING = 'COLLECTIONS:START_LOADING';
export const END_LOADING = 'COLLECTIONS:END_LOADING';
export const SET_SELECTED_TASK = 'COLLECTIONS:SET_SELECTED_TASK';
export const CLEAR_SELECTED_TASK = 'COLLECTIONS:CLEAR_SELECTED_TASK';

export type TSetCollections = {
	collections: WebApi.Entities.ICollection[];
};

export type TFetchCollections = {
	userId: string;
};

export type TSetSelectedTask = {
	taskId: string;
};
