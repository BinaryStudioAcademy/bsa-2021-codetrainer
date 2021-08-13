import { TClans, IClan, IMember } from 'typings/webapi';
import { ApiRoutes, HttpMethods } from 'constants/services';
import { http } from 'services';

export interface TFetchClansArgs {
	take: number;
	skip: number;
}

export const fetchClans = async ({ take, skip }: TFetchClansArgs): Promise<TClans | Error> => {
	try {
		const response = await http.callWebApi({
			method: HttpMethods.GET,
			endpoint: ApiRoutes.CLANS,
			query: {
				take,
				skip,
			},
		});

		const clans = response.map((clan: IClan) => ({
			...clan,
			createdAt: new Date(clan.createdAt),
		}));

		return clans;
	} catch (error) {
		return error;
	}
};

export const fetchClan = async (id: string): Promise<IClan | Error> => {
	try {
		const response = await http.callWebApi({
			method: HttpMethods.GET,
			endpoint: `${ApiRoutes.CLANS}${id}`,
		});

		const clan = {
			...response,
			members: response.members.map((member: IMember) => ({
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

export const joinClan = async (id: string): Promise<IClan | Error> => {
	try {
		const response = await http.callWebApi({
			method: HttpMethods.PATCH,
			endpoint: `${ApiRoutes.CLANS}${id}`,
		});

		const clan = {
			...response,
			members: response.members.map((member: IMember) => ({
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

export const leaveClan = async (id: string): Promise<IClan | Error> => {
	try {
		const response = await http.callWebApi({
			method: HttpMethods.PATCH,
			endpoint: `${ApiRoutes.CLANS}${id}`,
		});

		const clan = {
			...response,
			members: response.members.map((member: IMember) => ({
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
