import { HttpMethods } from 'constants/services';
import { ClansOrderByOptions } from 'containers/clans/clans/logic/state';
import { ClanApiPath } from 'enum/api/clan-api.path';
import { Order } from 'helpers/table-helper';
import { http } from 'services';
import { WebApi } from 'typings/webapi';
import { IClanForm } from 'components/modals/clan-modal/types';

export interface TFetchClansArgs {
	page: number;
	itemsPerPage: number;
	order: Order;
	orderBy: ClansOrderByOptions;
	nameQuery: string;
}

export const fetchClans = async ({
	page,
	itemsPerPage,
	order,
	orderBy,
	nameQuery,
}: TFetchClansArgs): Promise<WebApi.Entities.IClan | Error> => {
	try {
		const response = await http.callWebApi({
			method: HttpMethods.GET,
			endpoint: ClanApiPath.SEARCH,
			query: {
				take: itemsPerPage,
				skip: page * itemsPerPage,
				order: order.toUpperCase(),
				orderBy,
				...(nameQuery.length ? { nameQuery } : {}),
			},
		});

		const clans = response.data.map((clan: WebApi.Entities.IClan) => ({
			...clan,
			createdAt: new Date(clan.createdAt),
		}));
		return { ...response, data: clans };
	} catch (error) {
		return error;
	}
};

function mapResponseToClan(response: any): WebApi.Entities.IClan {
	return {
		...response,
		members: response.members.map((member: WebApi.Entities.IMember) => ({
			...member,
			createdAt: new Date(member.createdAt),
		})),
		createdAt: new Date(response.createdAt),
	};
}

export const fetchClan = async (id: string): Promise<WebApi.Entities.IClan | Error> => {
	try {
		const response = await http.callWebApi({
			method: HttpMethods.GET,
			endpoint: `${ClanApiPath.ROOT}${id}`,
		});

		return mapResponseToClan(response);
	} catch (error) {
		return error;
	}
};

export const updateClan = async (id: string, clan: IClanForm): Promise<WebApi.Entities.IClan> => {
	const response = await http.callWebApi({
		endpoint: `${ClanApiPath.ROOT}/${id}`,
		method: HttpMethods.PUT,
		body: clan,
	});

	return mapResponseToClan(response);
};

export const toggleClanMember = async (
	id: string,
): Promise<{ clan: WebApi.Entities.IClan; user: WebApi.Entities.IUser } | Error> => {
	try {
		const response = await http.callWebApi({
			method: HttpMethods.PATCH,
			endpoint: `${ClanApiPath.ROOT}${id}`,
		});

		const { clan, user } = response;

		return {
			clan: mapResponseToClan(clan),
			user,
		};
	} catch (error) {
		return error;
	}
};

export const deleteClan = async () => {
	await http.callWebApi({
		method: HttpMethods.DELETE,
		endpoint: ClanApiPath.ROOT,
		skipAuthorization: false,
	});
};
