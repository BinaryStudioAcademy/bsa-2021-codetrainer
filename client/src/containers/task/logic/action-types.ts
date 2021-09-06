import { WebApi } from '../../../typings/webapi';

export const GET_TASK = 'CHALLENGE:GET_TASK';
export const SET_TASK = 'CHALLENGE:SET_TASK';
export const SET_NOT_FOUND = 'CHALLENGE:SET_NOT_FOUND';
export const GET_TASKS = 'CHALLENGE:GET_TASKS';
export const SET_TASKS = 'CHALLENGE:SET_TASKS';
export const GET_NEXT_TASK = 'CHALLENGE:GET_NEXT_TASK';
export const SET_NEXT_TASK = 'CHALLENGE:SET_NEXT_TASK';
export const GET_FOLLOWING = 'CHALLENGE:GET_FOLLOWING';
export const SET_FOLLOWING = 'CHALLENGE:SET_FOLLOWING';

export const GET_COMMENTS = 'CHALLENGE:GET_COMMENTS';
export const SET_COMMENTS = 'CHALLENGE:SET_COMMENTS';
export const ADD_COMMENTS = 'CHALLENGE:ADD_COMMENTS';
export const POST_COMMENT = 'CHALLENGE:POST_COMMENT';
export const EDIT_COMMENT = 'CHALLENGE:EDIT_COMMENT';
export const DELETE_COMMENT = 'CHALLENGE:DELETE_COMMENT';
export const INCREMENT_COMMENTS_PAGE = 'CHALLENGE:INCREMENT_COMMENTS_PAGE';
export const SET_COMMENTS_PAGE = 'CHALLENGE:SET_COMMENTS_PAGE';

export type TSetComments = {
	comments: Array<WebApi.Entities.ICommentTask>;
};

export type TAddComments = {
	comments: Array<WebApi.Entities.ICommentTask>;
	before?: boolean;
};

export type TPostComment = {
	body: string;
};

export type TEditComment = {
	id: string;
	body: string;
};

export type TDeleteComment = {
	id: string;
};

export type TSetCommentsPage = {
	page: number;
};

export type TGetFollowing = {
	id?: string;
};

export type TSetFollowing = {
	following: WebApi.Entities.IUser[];
};

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
