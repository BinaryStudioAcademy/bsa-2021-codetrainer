import { ApiRoutes, HttpMethods } from 'constants/services';
import { http } from 'services';
import { WebApi } from 'typings/webapi';
import {
	TTaskSolutions,
	completedSolutionsMocks,
	uncompletedSolutionsMocks,
} from 'containers/profile/tabs/solutions/mocks';
import { TLoader } from 'typings/common/loader';

export const fetchUserSolution = async (taskId: string): Promise<WebApi.Entities.ITask | Error> => {
	try {
		const { solution } = await http.callWebApi({
			method: HttpMethods.GET,
			endpoint: `${ApiRoutes.TASKS}${taskId}/train/user`,
		});

		return solution;
	} catch (error) {
		return error;
	}
};

export const submitSolution = async ({ taskId, code }: { code: string; taskId: string }): Promise<unknown | Error> => {
	try {
		const response = await http.callWebApi({
			method: HttpMethods.POST,
			endpoint: `${ApiRoutes.TASKS}${taskId}/train`,
			body: { code },
		});

		return response;
	} catch (error) {
		return error;
	}
};

export const editSolution = async ({
	solutionId,
	taskId,
	code,
}: {
	solutionId: string;
	code: string;
	taskId: string;
}): Promise<unknown | Error> => {
	try {
		const response = await http.callWebApi({
			method: HttpMethods.PUT,
			endpoint: `${ApiRoutes.TASKS}${taskId}/train/${solutionId}`,
			body: { code },
		});
		return response;
	} catch (error) {
		return error;
	}
};

export interface TSolutionsRequestArgs {
	skip: number;
	limit: number;
}

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
