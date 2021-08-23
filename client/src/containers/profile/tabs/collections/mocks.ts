import { WebApi } from 'typings/webapi';
import { uniqueId } from 'lodash';
import moment from 'moment';
import { TaskStatus } from 'typings/common/task';

export const usersMocks: WebApi.Entities.IUser[] = [
	{
		username: 'i-does-not-exists',
		name: 'Jane',
		surname: 'Doe',
		email: 'converge@test.com',
		rank: 4,
		honor: 1080,
	},
	{
		username: 'i-does-not-exists-too',
		name: 'John',
		surname: 'Doe',
		email: 'notconverge@test.com',
		rank: 4,
		honor: 1080,
	},
	{
		username: '0xDEADDEAD',
		name: 'Dead',
		surname: 'Inside',
		email: 'DEADDEAD@test.com',
		rank: 2,
		honor: 5432,
	},
].map((user) => ({ id: uniqueId('user'), ...user }));

export const tasksMocks: WebApi.Entities.ITask[] = [
	{
		name: 'Five without numbers!',
		rank: 9,
		author: usersMocks[0],
		createdAt: new Date(),
	},
	{
		name: 'Regular Expression for Binary Numbers Divisible by n',
		rank: 1,
		author: usersMocks[0],
		createdAt: new Date(),
	},
	{
		name: 'Decode Morse I',
		rank: 7,
		author: usersMocks[0],
		createdAt: new Date(),
	},
	{
		name: 'Decode Morse II',
		rank: 5,
		author: usersMocks[0],
		createdAt: new Date(),
	},
	{
		name: 'Decode Morse III',
		rank: 2,
		author: usersMocks[0],
		createdAt: new Date(),
	},
	{
		name: 'Fibonacci numbers',
		rank: 8,
		author: usersMocks[1],
		createdAt: new Date(),
	},
	{
		name: 'Perimeter of squares in a rectangle',
		rank: 5,
		author: usersMocks[0],
		createdAt: new Date(),
	},
	{
		name: 'Memoized Fibonacci',
		rank: 5,
		author: usersMocks[1],
		createdAt: new Date(),
	},
	{
		name: 'The Millionth Fibonacci',
		status: TaskStatus.BETA,
		rank: 3,
		author: usersMocks[1],
		createdAt: new Date(),
	},
	{
		name: 'Assembler interpreter EASY',
		rank: 4,
		author: usersMocks[0],
		createdAt: new Date(),
	},
	{
		name: 'Assembler interpreter HARD',
		rank: 2,
		author: usersMocks[0],
		createdAt: new Date(),
	},
	{
		name: 'A and B?',
		rank: 8,
		author: usersMocks[1],
		createdAt: new Date(),
	},
	{
		name: 'Predict Math.random',
		rank: 4,
		author: usersMocks[0],
		createdAt: new Date(),
	},
	{
		name: 'Symbolic differentiation of prefix expressions',
		rank: 2,
		author: usersMocks[1],
		createdAt: new Date(),
	},
	{
		name: 'Regular Expression for Binary Numbers Divisible by n',
		rank: 1,
		author: usersMocks[1],
		createdAt: new Date(),
	},
	{
		name: 'BECOME IMMORTAL',
		rank: 1,
		author: usersMocks[1],
		createdAt: new Date(),
	},
	{
		name: 'Brainf*ck transpiler',
		rank: 1,
		author: usersMocks[1],
		createdAt: new Date(),
	},
].map((challenge) => ({ id: uniqueId('task'), status: challenge.status || TaskStatus.APPROVED, ...challenge }));

const collectionsMocks: WebApi.Entities.ICollection[] = [
	{
		name: 'Decode Morse',
		tasks: [tasksMocks[2], tasksMocks[3], tasksMocks[4]],
		avatar: 'https://www.svgrepo.com/show/209154/morse-code.svg',
		author: usersMocks[0],
		followers: [],
		createdAt: moment().subtract(4, 'days').toDate(),
		updatedAt: moment().subtract(2, 'days').subtract(3, 'hours').toDate(),
	},
	{
		name: 'Fibonacci Pack',
		tasks: [tasksMocks[5], tasksMocks[6], tasksMocks[7], tasksMocks[8]],
		avatar: 'https://www.svgrepo.com/show/152754/ratio.svg',
		author: usersMocks[1],
		followers: [],
		createdAt: moment().subtract(3, 'days').subtract(4, 'hours').toDate(),
		updatedAt: moment().subtract(5, 'hours').toDate(),
	},
	{
		name: 'Assembler',
		tasks: [tasksMocks[9], tasksMocks[10]],
		avatar: 'https://apprecs.org/ios/images/app-icons/256/0e/500466958.jpg',
		author: usersMocks[0],
		followers: [],
		createdAt: moment().subtract(5, 'minutes').subtract(36, 'seconds').toDate(),
	},
	{
		name: 'Puzzles',
		tasks: [tasksMocks[0], tasksMocks[11], tasksMocks[12]],
		avatar: 'https://image.flaticon.com/icons/png/512/786/786771.png',
		author: usersMocks[2],
		followers: [],
		createdAt: new Date(),
	},
	{
		name: 'IMPOSSIBLE',
		tasks: [tasksMocks[13], tasksMocks[14], tasksMocks[15], tasksMocks[16]],
		author: usersMocks[2],
		followers: [],
		createdAt: moment().subtract(3, 'months').toDate(),
		updatedAt: new Date(),
	},
].map((collection) => ({ id: uniqueId('collection'), ...collection }));

export const authoredCollectionsMocks: WebApi.Entities.ICollection[] = collectionsMocks.filter(
	(_, index) => index % 2 === 0,
);
export const followedCollectionsMocks: WebApi.Entities.ICollection[] = collectionsMocks.filter(
	(_, index) => index % 2 !== 0,
);
