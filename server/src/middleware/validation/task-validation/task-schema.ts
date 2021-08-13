import { checkSchema } from 'express-validator';

export const taskSchema = checkSchema({
	name: {
		in: 'body',
		errorMessage: 'Wrong name format',
		trim: true,
		isString: true,
		optional: true,
		notEmpty: true,
	},
	rank: {
		in: 'body',
		errorMessage: 'Wrong difficulty format',
		isInt: true,
		optional: true,
		notEmpty: true,
	},
	description: {
		in: 'body',
		errorMessage: 'Wrong description format',
		trim: true,
		isString: true,
		optional: true,
		notEmpty: true,
	},
	testCase: {
		in: 'body',
		errorMessage: 'Wrong test case format',
		trim: true,
		isString: true,
		optional: true,
		notEmpty: true,
	},
	testCaseSample: {
		in: 'body',
		errorMessage: 'Wrong test case sample format',
		trim: true,
		isString: true,
		optional: true,
		notEmpty: true,
	},
	initialSolution: {
		in: 'body',
		errorMessage: 'Wrong initial solution format',
		trim: true,
		isString: true,
		optional: true,
		notEmpty: true,
	},
	completeSolution: {
		in: 'body',
		errorMessage: 'Wrong complete solution format',
		trim: true,
		isString: true,
		optional: true,
		notEmpty: true,
	},
});
