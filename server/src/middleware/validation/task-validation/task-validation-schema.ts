import { checkSchema } from 'express-validator';
import { CODE_ERRORS } from '../../../common';
import { ValidationError } from '../../../helpers';
import { TypeTest } from '../../../types';

export const taskValidationSchema = checkSchema({
	type: {
		in: 'query',
		errorMessage: 'Wrong type format',
		custom: {
			options: (type: string) => {
				if (type !== TypeTest.TEST_TASK) {
					throw new ValidationError(CODE_ERRORS.TASK_TYPE_VALIDATION);
				}
				return true;
			},
		},
		trim: true,
		isString: true,
		notEmpty: true,
	},
});
