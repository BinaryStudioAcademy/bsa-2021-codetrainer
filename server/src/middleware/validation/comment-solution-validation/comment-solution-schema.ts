import { checkSchema } from 'express-validator';

export const commentSolutionSchema = checkSchema({
	body: {
		in: 'body',
		errorMessage: 'Wrong comment format',
		trim: true,
		isString: true,
		notEmpty: true,
	},
});
