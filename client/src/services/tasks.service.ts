import { ApiRoutes, HttpMethods } from 'constants/services';
import { http } from 'services';
import { WebApi } from 'typings/webapi';

export const fetchTask = async (id: string): Promise<WebApi.Entities.ITask | Error> => {
	try {
		const response = await http.callWebApi({
			method: HttpMethods.GET,
			endpoint: `${ApiRoutes.TASKS}${id}`,
		});

		return response;
	} catch (error) {
		return error;
	}
};

export const fetchNextTask = async (): Promise<{ nextTask: WebApi.Entities.ITask } | Error> => {
	try {
		const response = await http.callWebApi({
			method: HttpMethods.GET,
			endpoint: `${ApiRoutes.TASKS}next`,
		});

		return response;
	} catch (error) {
		return error;
	}
};
