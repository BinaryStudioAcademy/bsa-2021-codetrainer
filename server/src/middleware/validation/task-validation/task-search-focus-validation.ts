import { checkSchema } from 'express-validator';
import { CODE_ERRORS, SEARCH_FOCUS_KEYS } from '../../../common';
import { ValidationError } from '../../../helpers';

export const taskSearchFocusSchema = checkSchema({
	focus: {
		in: 'query',
		errorMessage: 'Wrong focus format',
		custom: {
			options: (focus: string) => {
				const isFocus = Object.values(SEARCH_FOCUS_KEYS).some((value) => value === focus);
				if (!isFocus) {
					throw new ValidationError(CODE_ERRORS.TASK_QUERY('focus'));
				}
				return true;
			},
		},
		trim: true,
		isString: true,
		notEmpty: true,
	},
});
