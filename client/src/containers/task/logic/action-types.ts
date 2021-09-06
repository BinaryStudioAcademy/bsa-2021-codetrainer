import { WebApi } from '../../../typings/webapi';
import { SolutionStatus } from 'typings/common/solution';

export const GET_TASK = 'CHALLENGE:GET_TASK';
export const SET_TASK = 'CHALLENGE:SET_TASK';
export const SET_NOT_FOUND = 'CHALLENGE:SET_NOT_FOUND';
export const GET_TASKS = 'CHALLENGE:GET_TASKS';
export const SET_TASKS = 'CHALLENGE:SET_TASKS';
export const GET_NEXT_TASK = 'CHALLENGE:GET_NEXT_TASK';
export const SET_NEXT_TASK = 'CHALLENGE:SET_NEXT_TASK';
export const GET_FOLLOWING = 'CHALLENGE:GET_FOLLOWING';
export const SET_FOLLOWING = 'CHALLENGE:SET_FOLLOWING';
export const GET_USER_SOLUTION = 'CHALLENGE:GET_USER_SOLUTION';
export const SET_USER_SOLUTION = 'CHALLENGE:SET_USER_SOLUTION';
export const UNLOCK_SOLUTION = 'CHALLENGE:UNLOCK_SOLUTION';
export const SET_IS_LOADING = 'CHALLENGE:SET_IS_LOADING';
export const GET_STATS = 'CHALLENGE:GET_STATS';
export const SET_STATS = 'CHALLENGE:SET_STATS';
export const SKIP_TASK = 'CHALLENGE:SKIP_TASK';

export type TSkipTask = {
	taskId: string;
	code: string;
	testCases: string;
	status?: SolutionStatus;
	solutionId?: string;
};

export type TGetStats = {
	id?: string;
};

export type TSetStats = {
	stats: WebApi.Entities.IStats;
};

export type TSetIsLoading = {
	isLoading: boolean;
};

export type TUnlockSolution = {
	taskId: string;
	code: string;
	testCases: string;
	status?: SolutionStatus;
	solutionId?: string;
};

export type TGetUserSolution = {
	taskId?: string;
};

export type TSetUserSolution = {
	nextTaskId: string;
	solution?: WebApi.Entities.ISolution;
};

export type TGetFollowing = {
	id?: string;
};

export type TSetFollowing = {
	following: WebApi.Entities.IUser[];
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
