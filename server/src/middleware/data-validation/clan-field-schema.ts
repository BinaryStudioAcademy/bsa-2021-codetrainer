import joi from 'joi';

export const clanFieldsSchema = joi
	.object({
		name: joi.string().trim().optional(),
		description: joi.string().trim().allow(null, '').optional(),
		isPublic: joi.boolean().optional(),
		avatar: joi.string().allow(null).optional(),
		cover: joi.string().allow(null).optional(),
		maxMembers: joi.number().optional(),
	})
	.required();
