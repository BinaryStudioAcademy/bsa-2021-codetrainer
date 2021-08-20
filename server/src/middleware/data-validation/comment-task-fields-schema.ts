import joi from 'joi';

export const commentTaskFieldsSchema = joi
	.object({
		user: joi.string().required(),
		task: joi.string().required(),
		body: joi.string().required(),
	})
	.required();
