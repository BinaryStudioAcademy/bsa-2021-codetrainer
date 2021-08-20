import { UsersApiPath } from 'enum/api/users-api.path';
import { http } from 'services';

export const fetchUsersSearch = async (query: Record<string, any>): Promise<Record<string, any>> => {
	const search = await http.callWebApi({
		method: 'GET',
		endpoint: UsersApiPath.SEARCH,
		query,
	});

	return search;
};
