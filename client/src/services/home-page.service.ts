import { HttpMethods } from 'constants/services';
import { TaskApiPath } from 'enum';
import { http } from 'services';
import { WebApi } from 'typings/webapi';

export const fetchTasks = async () => {
	const res = await http.callWebApi({
		method: 'GET',
		endpoint: 'tasks',
	});

	return res;
};

export const fetchTaskComments = async ({ skip, take }: { skip: number; take: number }) => {
	const res = await http.callWebApi({
		method: 'GET',
		endpoint: 'comment-task',
		query: { skip, take },
	});

	return res;
};

export const fetchFocusTask = async (focus: string): Promise<WebApi.Entities.ITask | null> => {
	return await http.callWebApi({
		method: HttpMethods.GET,
		endpoint: TaskApiPath.FOCUS_TASK,
		query: { focus },
	});
};
