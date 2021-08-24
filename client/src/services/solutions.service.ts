import { WebApi } from 'typings/webapi';
import {
	TTaskSolutions,
	completedSolutionsMocks,
	uncompletedSolutionsMocks,
} from 'containers/profile/tabs/solutions/mocks';
import { TLoader } from 'typings/common/loader';

export type TPrivateSolutionsLoader = TLoader<
	WebApi.Types.TPaginationRequest,
	WebApi.Types.TPaginationResponse<TTaskSolutions, 'solutions'>
>;

// TODO: implement in backend and call api
export const getCompletedSolutions: TPrivateSolutionsLoader = async ({ skip, take }) => ({
	solutions: completedSolutionsMocks.slice(skip, skip + take),
	total: completedSolutionsMocks.length,
});

// TODO: implement in backend and call api
export const getUncompletedSolutions: TPrivateSolutionsLoader = async ({ skip, take }) => ({
	solutions: uncompletedSolutionsMocks.slice(skip, skip + take),
	total: uncompletedSolutionsMocks.length,
});
