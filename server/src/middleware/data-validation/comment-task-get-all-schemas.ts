import joi from 'joi';

export const commentTaskGetAllSchema = joi
	.object({
		skip: joi.string().required(),
		take: joi.string().required(),
	})
	.required();
