import { HttpMethods } from 'constants/services';
import { UsersApiPath } from 'enum/api/users-api.path';
import { Order } from 'helpers/table-helper';
import { http } from 'services';
import { WebApi } from 'typings/webapi';

export interface TFetchUserLeadersArgs {
	page: number;
	itemsPerPage: number;
	order: Order;
	orderBy: string;
	nameQuery: string;
}

export const fetchUsersSearch = async (query: Record<string, any>): Promise<Record<string, any>> => {
	const search = await http.callWebApi({
		method: HttpMethods.GET,
		endpoint: UsersApiPath.SEARCH,
		query,
	});
	return search;
};

export const fetchUserLeaders = async ({
	page,
	itemsPerPage,
	order,
	orderBy,
	nameQuery,
}: TFetchUserLeadersArgs): Promise<WebApi.Entities.IUser[] | Error> => {
	try {
		const response = await http.callWebApi({
			method: HttpMethods.GET,
			endpoint: UsersApiPath.LEADERBOARD,
			query: {
				take: itemsPerPage,
				skip: page * itemsPerPage,
				order: order.toUpperCase(),
				orderBy,
				...(nameQuery.length ? { nameQuery } : {}),
			},
		});

		return response;
	} catch (error) {
		return error;
	}
};

export const getUserById = async (id: string) => {
	const result = await http.callWebApi({
		endpoint: '/users/' + id,
		method: 'GET',
		skipAuthorization: false,
	});
	return result;
};
