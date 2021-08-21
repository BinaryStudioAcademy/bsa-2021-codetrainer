import { ApiRoutes, HttpMethods } from 'constants/services';
import { http } from 'services';
import { WebApi } from 'typings/webapi';

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
