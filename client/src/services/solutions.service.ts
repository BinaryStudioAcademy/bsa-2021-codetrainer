import { SolutionStatus } from 'typings/common/solution';
import { ApiRoutes, HttpMethods } from 'constants/services';
import { http } from 'services';
import { WebApi } from 'typings/webapi';
import { TLoader } from 'typings/common/loader';
import { TypeTest } from 'constants/task';
import { TaskApiPath } from 'enum';

interface ISubmitSolution {
	code: string;
	taskId: string;
	testCases: string;
	typeTest?: TypeTest;
}

interface IEditSolution extends ISubmitSolution {
	solutionId: string;
}
interface IPatchSolution extends IEditSolution {
	status?: string;
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

export const patchSolution = async ({
	taskId,
	solutionId,
	...body
}: Partial<IPatchSolution>): Promise<unknown | Error> => {
	return await callApi(HttpMethods.PATCH, `${ApiRoutes.TASKS}${taskId}/train/${solutionId}`, { ...body });
};

export type TTaskSolutionsLoader = TLoader<
	WebApi.Types.TPaginationRequest,
	WebApi.Types.TPaginationResponse<WebApi.Entities.ITask, 'tasks'>
>;

export const getUserSolutions: TTaskSolutionsLoader = async ({ skip, take, status }) =>
	http.callWebApi({
		endpoint: TaskApiPath.USER_SOLUTIONS,
		method: HttpMethods.GET,
		query: {
			status,
			skip,
			take,
		},
	});

export const getCompletedSolutions: TTaskSolutionsLoader = async ({ skip, take }) =>
	http.callWebApi({
		endpoint: `${ApiRoutes.TASKS}search/user-solutions`,
		method: HttpMethods.GET,
		query: {
			status: SolutionStatus.COMPLETED,
			skip,
			take,
		},
	});

export const getUncompletedSolutions: TTaskSolutionsLoader = async ({ skip, take }) =>
	http.callWebApi({
		endpoint: `${ApiRoutes.TASKS}search/user-solutions`,
		method: HttpMethods.GET,
		query: {
			status: SolutionStatus.NOT_COMPLETED,
			skip,
			take,
		},
	});

export const getSkippedSolutions: TTaskSolutionsLoader = async ({ skip, take }) =>
	http.callWebApi({
		endpoint: `${ApiRoutes.TASKS}search/user-solutions`,
		method: HttpMethods.GET,
		query: {
			status: SolutionStatus.SKIPPED,
			skip,
			take,
		},
	});

export const getUnlockedSolutions: TTaskSolutionsLoader = async ({ skip, take }) =>
	http.callWebApi({
		endpoint: `${ApiRoutes.TASKS}search/user-solutions`,
		method: HttpMethods.GET,
		query: {
			status: SolutionStatus.UNLOCKED,
			skip,
			take,
		},
	});

export const getUserSolutionsCount: () => Promise<{ [key in SolutionStatus]: string }> = async () =>
	http.callWebApi({ endpoint: TaskApiPath.USER_SOLUTIONS_COUNT, method: HttpMethods.GET });
