import joi from 'joi';

export const clanFieldsSchema = joi
	.object({
		name: joi.string(),
		isPublic: joi.boolean(),
	})
	.required();
