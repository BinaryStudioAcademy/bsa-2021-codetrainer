import { Schema } from 'express-validator';
import { CODE_ERRORS, TASK_QUERY_SEPARATOR } from '../../../common';
import { ValidationError } from '../../../helpers';

export const tagsValidation: Schema[''] = {
	errorMessage: 'Wrong tags format',
	custom: {
		options: (value: string) => {
			if (typeof value !== 'string') {
				return;
			}

			const tags = value.split(TASK_QUERY_SEPARATOR).filter((v) => Boolean(v.length));
			if (!tags.length && value !== '') {
				throw new ValidationError(CODE_ERRORS.TASK_QUERY('tags'));
			}
			// eslint-disable-next-line consistent-return
			return true;
		},
	},
	customSanitizer: {
		options: (value: string) => value.split(TASK_QUERY_SEPARATOR),
	},
	optional: true,
};
