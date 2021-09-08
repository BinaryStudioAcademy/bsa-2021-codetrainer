import { checkSchema } from 'express-validator';
import { CODE_ERRORS, TASK_DISCIPLINE } from '../../../common';
import { ValidationError } from '../../../helpers';
import { tagsValidation } from './task-tags-validation';

export const taskSchema = checkSchema({
	name: {
		in: 'body',
		errorMessage: 'Wrong name format',
		trim: true,
		isString: true,
		notEmpty: true,
		optional: true,
	},
	discipline: {
		in: 'body',
		errorMessage: 'Wrong discipline format',
		custom: {
			options: (discipline: string) => {
				const order = Object.entries(TASK_DISCIPLINE).find(([_key, value]) => value === discipline);
				if (!order) {
					throw new ValidationError(CODE_ERRORS.TASK_QUERY('discipline'));
				}
				return true;
			},
		},
		trim: true,
		isString: true,
		optional: true,
		notEmpty: true,
	},
	rank: {
		in: 'body',
		errorMessage: 'Wrong rank format',
		isInt: true,
		optional: true,
		notEmpty: true,
	},
	tags: {
		in: 'body',
		...tagsValidation,
	},
	allowContributors: {
		in: 'body',
		errorMessage: 'Wrong allowContributors format',
		trim: true,
		isBoolean: true,
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
	completeSolution: {
		in: 'body',
		errorMessage: 'Wrong complete solution format',
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
	testCases: {
		in: 'body',
		errorMessage: 'Wrong test cases format',
		trim: true,
		isString: true,
		optional: true,
		notEmpty: true,
	},
	exampleTestCases: {
		in: 'body',
		errorMessage: 'Wrong example test cases sample format',
		trim: true,
		isString: true,
		optional: true,
		notEmpty: true,
	},
});
