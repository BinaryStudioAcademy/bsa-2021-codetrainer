import joi from 'joi';

export const clanFieldsSchema = joi
	.object({
		name: joi.string().required(),
		isPublic: joi.boolean().required(),
	})
	.required();
