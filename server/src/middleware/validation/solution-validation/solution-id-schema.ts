import { checkSchema } from 'express-validator';

export const solutionIdSchema = checkSchema({
	idSolution: {
		in: 'params',
		isUUID: true,
	},
});
