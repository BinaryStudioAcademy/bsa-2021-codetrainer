import { RequestHandler } from 'express';
import { validationResult, checkSchema, matchedData } from 'express-validator';
import { HttpCodes } from '../../common';

export const validationMiddleware =
	(schemas: ReturnType<typeof checkSchema>[]): RequestHandler =>
	async (req, res, next) => {
		await Promise.all(schemas.map((schema) => schema.run(req)));
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(HttpCodes.BAD_REQUEST).send({ errors: errors.array() });
		} else {
			req.validData = matchedData(req);
			next();
		}
	};

export { taskSchema, taskIdSchema, taskSearchSchema } from './task-validation';
export { resetPasswordSchema, forgotPasswordSchema } from './auth-validation';
export { solutionIdSchema, solutionSchema } from './solution-validation';
