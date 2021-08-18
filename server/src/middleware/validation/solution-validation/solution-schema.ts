import { checkSchema } from 'express-validator';

export const solutionSchema = checkSchema({
	code: {
		in: 'body',
		errorMessage: 'Wrong code format',
		trim: true,
		isString: true,
		notEmpty: true,
	},
});
