import { RequestHandler, Request } from 'express';
import Joi from 'joi';
import { userFieldsSchema } from './users-schema';
import { ValidationError } from '../../helpers';

export const SchemasUserDataValidation: Record<string, Joi.ObjectSchema<any>> = {
	userFieldsSchema,
};

export const userValidationMiddleware =
	(schema: Joi.ObjectSchema<any>, reqType: keyof Request): RequestHandler =>
	(req, _res, next) => {
		const isValidResult = schema.validate(req[reqType]);
		if (isValidResult.error) {
			throw new ValidationError({
				message: isValidResult.error.details[0].message,
				status: 401,
			});
		}
		next();
	};
