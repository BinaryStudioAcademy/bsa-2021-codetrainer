import { checkSchema } from 'express-validator';

export const idSchema = checkSchema({
	id: {
		in: 'params',
		isUUID: true,
	},
});
