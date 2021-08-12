import { checkSchema } from 'express-validator';

export const forgotPasswordSchema = checkSchema({
	email: {
		in: 'body',
		errorMessage: 'Email is required',
		isString: true,
		trim: true,
	},
});
