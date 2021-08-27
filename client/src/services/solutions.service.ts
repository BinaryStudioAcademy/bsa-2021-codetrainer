import { ApiRoutes, HttpMethods } from 'constants/services';
import { http } from 'services';
import { WebApi } from 'typings/webapi';
import {
	TTaskSolutions,
	completedSolutionsMocks,
	uncompletedSolutionsMocks,
} from 'containers/profile/tabs/solutions/mocks';
import { TLoader } from 'typings/common/loader';
import { TypeTest } from 'constants/task';

interface ISubmitSolution {
	code: string;
	taskId: string;
	testCases: string;
	typeTest: TypeTest;
}

interface IEditSolution extends ISubmitSolution {
	solutionId: string;
}

const callApi = async (method: HttpMethods, endpoint: string, body?: Record<string, unknown>): Promise<any> => {
	try {
		const response = await http.callWebApi({
			method,
			endpoint,
			body,
		});
		return response;
	} catch (error) {
		return error;
	}
};

export const fetchUserSolution = async (taskId: string): Promise<WebApi.Entities.ISolution | Error> => {
	return await callApi(HttpMethods.GET, `${ApiRoutes.TASKS}${taskId}/train/user`);
};

export const submitSolution = async ({ taskId, ...body }: ISubmitSolution): Promise<unknown | Error> => {
	return await callApi(HttpMethods.POST, `${ApiRoutes.TASKS}${taskId}/train`, { ...body });
};

export const editSolution = async ({ solutionId, taskId, ...body }: IEditSolution): Promise<unknown | Error> => {
	return await callApi(HttpMethods.PUT, `${ApiRoutes.TASKS}${taskId}/train/${solutionId}`, { ...body });
};

export const patchSolution = async ({ taskId, solutionId, ...body }: Partial<IEditSolution>) => {
	return await callApi(HttpMethods.PATCH, `${ApiRoutes.TASKS}${taskId}/train/${solutionId}`, { ...body });
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
