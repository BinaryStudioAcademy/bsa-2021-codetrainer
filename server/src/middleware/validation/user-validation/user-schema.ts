import { checkSchema } from 'express-validator';

const checkUserSchema = checkSchema({
	name: {
		in: 'body',
		errorMessage: 'Wrong name format',
		trim: true,
		isLength: {
			options: {
				min: 3,
				max: 25,
			},
		},
		isAlpha: true,
	},
	surname: {
		in: 'body',
		errorMessage: 'Wrong surname format',
		trim: true,
		isLength: {
			options: {
				min: 3,
				max: 25,
			},
		},
		isAlpha: true,
	},
	email: {
		in: 'body',
		errorMessage: 'Wrong email format',
		trim: true,
		isEmail: true,
	},
	password: {
		in: 'body',
		errorMessage:
			'Password length must be greater or equal to 8 and contain at least one uppercase letter, one lowercase letter, and one number',
		trim: true,
		isStrongPassword: {
			options: {
				minLength: 8,
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
			},
		},
	},
});

export default checkUserSchema;
