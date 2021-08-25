import joi from 'joi';

export const userFieldsSchema = joi.object({
	name: joi.string(),
	surname: joi.string(),
	username: joi.string(),
	avatar: joi.string(),
	createdAt: joi.string(), // Joi.date().format('YYYY-MM-DD').utc(); we need an exact understanding of what the date should be, or we just leave the string
	lastVisit: joi.string(),
	skills: joi.array().items(joi.string()),
	devLevel: joi.string(),
	social: joi.array().items(joi.string()),
	email: joi.string().email(),
	password: joi.string(),
});
