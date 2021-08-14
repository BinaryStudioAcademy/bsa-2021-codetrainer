import { checkSchema } from 'express-validator';

export const resetPasswordSchema = checkSchema({
	password: {
		in: 'body',
		errorMessage: 'Password is required',
		isString: true,
		trim: true,
	},
	token: {
		errorMessage: 'Token is missing',
		in: 'body',
		isString: true,
		trim: true,
	},
});
