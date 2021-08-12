import { RequestHandler, Request } from 'express';
import Joi from 'joi';
import { clanFieldsSchema } from './clan-field-schema';
import { followerFieldsSchema } from './follower-fields-schema';
import { ValidationError } from '../../helpers';

export const SchemasDataValidation: Record<string, Joi.ObjectSchema<any>> = {
	clanFieldsSchema,
	followerFieldsSchema,
};

export const dataValidationMiddleware =
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
