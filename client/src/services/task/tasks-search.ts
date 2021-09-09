import { ApiRoutes, HttpMethods } from 'constants/services';
import { TaskApiPath } from 'enum';
import { http } from 'services';
import { callApi } from 'services/solutions.service';

export const fetchTasksSearch = async (query: Record<string, any>): Promise<Record<string, any>> => {
	const search = await http.callWebApi({
		method: 'GET',
		endpoint: TaskApiPath.SEARCH,
		query,
	});

	return search;
};

export const updateTaskFavoriteStatus = async ({ id, isLiked }: { id: string; isLiked: boolean }): Promise<any> => {
	// const search = await http.callWebApi({
	// 	method: 'GET',
	// 	endpoint: TaskApiPath.LIKE,
	// 	query: { isLiked, id }
	// });
	debugger;
	const result = await callApi(HttpMethods.PUT, `${ApiRoutes.TASKS}/like`, { id, isLiked });
	return result;
};
