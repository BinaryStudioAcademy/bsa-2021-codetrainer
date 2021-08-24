import { ApiRoutes, HttpMethods } from 'constants/services';
import { http } from 'services';
import { WebApi } from 'typings/webapi';

export interface TFetchClansArgs {
	take: number;
	skip: number;
}

export const fetchClans = async ({ take, skip }: TFetchClansArgs): Promise<WebApi.Entities.IClan | Error> => {
	try {
		const response = await http.callWebApi({
			method: HttpMethods.GET,
			endpoint: ApiRoutes.CLANS,
			query: {
				take,
				skip,
			},
		});

		const clans = response.map((clan: WebApi.Entities.IMember) => ({
			...clan,
			createdAt: new Date(clan.createdAt),
		}));

		return clans;
	} catch (error) {
		return error;
	}
};

export const fetchClan = async (id: string): Promise<WebApi.Entities.IClan | Error> => {
	try {
		const response = await http.callWebApi({
			method: HttpMethods.GET,
			endpoint: `${ApiRoutes.CLANS}${id}`,
		});

		const clan = {
			...response,
			members: response.members.map((member: WebApi.Entities.IMember) => ({
				...member,
				createdAt: new Date(member.createdAt),
			})),
			createdAt: new Date(response.createdAt),
		};

		return clan;
	} catch (error) {
		return error;
	}
};

export const toggleClanMember = async (
	id: string,
): Promise<{ clan: WebApi.Entities.IClan; user: WebApi.Entities.IUser } | Error> => {
	try {
		const response = await http.callWebApi({
			method: HttpMethods.PATCH,
			endpoint: `${ApiRoutes.CLANS}${id}`,
		});

		const { clan, user } = response;

		return {
			clan: {
				...clan,
				members: clan.members.map((member: WebApi.Entities.IMember) => ({
					...member,
					createdAt: new Date(member.createdAt),
				})),
				createdAt: new Date(response.clan.createdAt),
			},
			user,
		};
	} catch (error) {
		return error;
	}
};

export const deleteClan = async () => {
	const result = await http.callWebApi({
		method: HttpMethods.DELETE,
		endpoint: ApiRoutes.CLANS,
		skipAuthorization: false,
	});
	console.log(result);
};
