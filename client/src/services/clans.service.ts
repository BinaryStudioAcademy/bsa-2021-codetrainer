import { IMember, TClans } from 'containers/clans/types';
import { IClan } from 'containers/clans/types';
import callWebApi from '../helpers/call-api.helper';

export interface TFetchClansArgs {
	take: number;
	skip: number;
}

export const fetchClans = async ({ take, skip }: TFetchClansArgs): Promise<TClans> => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: 'clan',
		query: {
			take,
			skip,
		},
	});

	const clans = (await res.json()).map((clan: IClan) => ({
		...clan,
		createdAt: new Date(clan.createdAt),
	}));

	return clans;
};

export const fetchClan = async (id: string): Promise<IClan> => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: `clan/${id}`,
	});

	const clan = await res.json().then((clan) => ({
		...clan,
		members: clan.members.map((member: IMember) => ({
			...member,
			createdAt: new Date(member.createdAt),
		})),
		createdAt: new Date(clan.createdAt),
	}));

	return clan;
};

export const joinClan = async (id: string): Promise<void> => {};

export const leaveClan = async (id: string): Promise<void> => {};
