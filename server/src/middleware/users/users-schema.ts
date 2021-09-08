import joi from 'joi';

export const userFieldsSchema = joi.object({
	name: joi.string().optional(),
	surname: joi.string().optional(),
	username: joi.string().optional(),
	avatar: joi.string().optional(),
	lastVisit: joi.string().optional(),
	skills: joi.array().items(joi.string()).optional(),
	devLevel: joi.string().optional(),
	social: joi.array().items(joi.string()).optional(),
	email: joi.string().email().optional(),
	password: joi.string().optional(),
});
