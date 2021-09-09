import { HttpMethods } from 'constants/services';
import { TypeTest } from 'constants/task';
import { TaskApiPath } from 'enum';
import { http } from 'services';
import { WebApi } from 'typings/webapi';

export const loadTasks = async () => {
	return await http.callWebApi({
		endpoint: TaskApiPath.USER_TASKS,
		method: HttpMethods.GET,
		skipAuthorization: false,
	});
};

export const createTask = async (body: Partial<WebApi.Entities.ITask>): Promise<WebApi.Entities.ITask> =>
	await http.callWebApi({
		method: HttpMethods.POST,
		endpoint: TaskApiPath.ROOT,
		skipAuthorization: false,
		body,
	});

export const updateTask = async (
	body: Partial<WebApi.Entities.ITask>,
	taskId: string,
): Promise<WebApi.Entities.ITask> =>
	await http.callWebApi({
		method: HttpMethods.PUT,
		endpoint: TaskApiPath.ROOT + taskId,
		skipAuthorization: false,
		body,
	});

export const validateTask = async (typeTest: TypeTest, taskId: string): Promise<WebApi.Entities.ITask> =>
	await http.callWebApi({
		method: HttpMethods.GET,
		endpoint: TaskApiPath.ROOT + taskId + TaskApiPath.VALIDATION,
		skipAuthorization: false,
		query: { type: typeTest },
	});

export const deleteTask = async (taskId: string): Promise<Record<string, unknown>> => {
	return await http.callWebApi({
		endpoint: TaskApiPath.ROOT + taskId,
		method: HttpMethods.DELETE,
		skipAuthorization: false,
	});
};

export const publishTask = async (taskId: string): Promise<WebApi.Entities.ITask> => {
	return await http.callWebApi({
		endpoint: TaskApiPath.ROOT + taskId + TaskApiPath.PUBLISH,
		method: HttpMethods.GET,
		skipAuthorization: false,
	});
};

export const getTaskById = async (id: string | null) => {
	if (id === null) {
		return {
			error: true,
			message: 'Task is not found',
		};
	}
	const result = await http.callWebApi({
		method: 'GET',
		endpoint: TaskApiPath.ROOT + id,
		skipAuthorization: false,
	});

	return result;
};
