import { checkSchema } from 'express-validator';

export const taskIdSchema = checkSchema({
	id: {
		in: 'params',
		isUUID: true,
	},
});
