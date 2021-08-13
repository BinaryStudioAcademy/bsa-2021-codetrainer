import { TaskApiPath } from 'enum';
import { http } from 'services';

export const fetchTasksSearch = async (query: Record<string, any>) => {
	const search = await http.callWebApi({
		method: 'GET',
		endpoint: TaskApiPath.SEARCH,
		query,
	});

	return search;
};
