import { checkSchema } from 'express-validator';

export const taskWithSolutionsSchema = checkSchema({
	skip: {
		in: 'query',
		errorMessage: 'Wrong skip format',
		isInt: true,
		optional: true,
		notEmpty: true,
	},
	take: {
		in: 'query',
		errorMessage: 'Wrong take format',
		isInt: true,
		optional: true,
		notEmpty: true,
	},
	status: {
		in: 'query',
		errorMessage: 'Wrong status format',
		trim: true,
		isString: true,
		optional: true,
		notEmpty: true,
	},
});
