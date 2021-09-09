import { Schema } from 'express-validator';

export const tagsValidation: Schema[''] = {
	errorMessage: 'Wrong tags format',
	custom: {
		options: (value: { name: string }[]) => {
			if (!Array.isArray(value) || !value.every((tag) => typeof tag?.name === 'string')) {
				return false;
			}
			return true;
		},
	},
	optional: true,
};
