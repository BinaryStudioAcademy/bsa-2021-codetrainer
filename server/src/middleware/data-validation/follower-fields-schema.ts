import joi from 'joi';

export const followerFieldsSchema = joi
	.object({
		following: joi.string().required(),
		follower: joi.string().required(),
	})
	.required();
