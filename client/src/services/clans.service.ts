import { TClans } from 'containers/clans/logic/state';
// import callWebApi from '../helpers/call-api.helper';

export interface TFetchClansArgs {
	take: number;
	skip: number;
}

export const fetchClans = async ({ take, skip }: TFetchClansArgs): Promise<TClans> => {
	// const res = await callWebApi({
	// 	method: 'GET',
	// 	endpoint: 'clan',
	// 	body: {
	// 		take,
	// 		skip,
	// 	},
	// });
	// const { clans } = await res.json();

	// return clans;
	return [
		{
			id: '1',
			name: 'Name 1',
			rank: 1,
			avatar: '/',
			honour: 20,
			isPublic: true,
			maxMembers: 20,
			numberOfMembers: 1,
			createdAt: new Date(),
		},
		{
			id: '2',
			name: 'Name 2',
			rank: 2,
			avatar: '/',
			honour: 10,
			isPublic: false,
			maxMembers: 10,
			numberOfMembers: 10,
			createdAt: new Date('1970-02-02'),
		},
	];
};

export const joinClan = async (id: string, token: string): Promise<void> => {};

export const leaveClan = async (id: string, token: string): Promise<void> => {};
