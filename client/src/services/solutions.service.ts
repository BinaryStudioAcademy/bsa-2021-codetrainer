import {
	TTaskSolutions,
	completedSolutionsMocks,
	uncompletedSolutionsMocks,
} from 'containers/profile/tabs/solutions/mocks';
import { TLoader } from 'typings/common/loader';

export interface TSolutionsRequestArgs {
	skip: number;
	limit: number;
}

export type TPrivateSolutionsLoader = TLoader<TSolutionsRequestArgs, TTaskSolutions>;

// TODO: implement in backend and call api
export const getCompletedSolutions: TPrivateSolutionsLoader = async ({ skip, limit }) => ({
	items: completedSolutionsMocks.slice(skip, skip + limit),
	full: completedSolutionsMocks.length,
	hasMore: skip + limit < completedSolutionsMocks.length,
});

// TODO: implement in backend and call api
export const getUncompletedSolutions: TPrivateSolutionsLoader = async ({ skip, limit }) => ({
	items: uncompletedSolutionsMocks.slice(skip, skip + limit),
	full: uncompletedSolutionsMocks.length,
	hasMore: skip + limit < uncompletedSolutionsMocks.length,
});
