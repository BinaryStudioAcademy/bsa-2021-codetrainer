import joi from 'joi';

export const followerFieldsSchema = joi
	.object({
		user: joi.string().required(),
		follower: joi.string().required(),
	})
	.required();
