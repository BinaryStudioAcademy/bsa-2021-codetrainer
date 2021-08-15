import { WebApi } from 'typings/webapi';

const clans: Record<string, WebApi.Entities.IClan> = {
	'clan a': {
		name: 'clan a',
	} as WebApi.Entities.IClan,
	'clan b': {
		name: 'clan b',
	} as WebApi.Entities.IClan,
	'clan f': {
		name: 'clan f',
	} as WebApi.Entities.IClan,
};

export const social = [
	{
		title: 'Followers',
		id: 'followers',
		users: [
			{
				id: '90',
				rank: 4,
				profileUrl: '',
				username: 'vasik',
				name: 'Vasya',
				clan: clans['clan a'],
				honor: 900,
			},
			{
				id: '91',
				rank: 4,
				profileUrl: '',
				username: 'ivasik',
				name: 'Vasya',
				clan: clans['clan a'],
				honor: 900,
			},
			{
				id: '92',
				rank: 4,
				profileUrl: '',
				username: 'vasik',
				name: 'Vasya',
				clan: clans['clan a'],
				honor: 900,
			},
			{
				id: '93',
				rank: 4,
				profileUrl: '',
				username: 'vasik',
				name: 'Vasya',
				clan: clans['clan a'],
				honor: 900,
			},
		],
	},
	{
		title: 'Following',
		id: 'following',
		users: [
			{
				id: '95',
				rank: 4,
				profileUrl: '',
				username: 'john',
				name: 'John',
				clan: clans['clan b'],
				honor: 900,
			},
			{
				id: '96',
				rank: 4,
				profileUrl: '',
				username: 'petro',
				name: 'Petro',
				clan: clans['clan b'],
				honor: 900,
			},
			{
				id: '97',
				rank: 4,
				profileUrl: '',
				username: 'chris',
				name: 'Chris',
				clan: clans['clan a'],
				honor: 900,
			},
		],
	},
	{
		title: 'Community',
		id: 'community',
		users: [
			{
				id: '98',
				rank: 4,
				profileUrl: '',
				username: 'ge',
				name: 'George',
				clan: clans['clan f'],
				honor: 900,
			},
			{
				id: '99',
				rank: 4,
				profileUrl: '',
				username: 'ja',
				name: 'James',
				clan: clans['clan b'],
				honor: 800,
			},
			{
				id: '100',
				rank: 4,
				profileUrl: '',
				username: 'chris',
				name: 'Chris',
				clan: clans['clan b'],
				honor: 900,
			},
		],
	},
];
