import joi from 'joi';

export const commentTaskFieldsSchema = joi
	.object({
		body: joi.string().required(),
	})
	.required();
