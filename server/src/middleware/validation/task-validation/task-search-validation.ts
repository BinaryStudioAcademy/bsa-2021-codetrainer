import { checkSchema } from 'express-validator';
import { CODE_ERRORS, SOLUTION_STATUS, TASK_ORDER_BY, TASK_QUERY_SEPARATOR, TASK_STATUS } from '../../../common';
import { ValidationError } from '../../../helpers';

export const taskSchema = checkSchema({
	q: {
		in: 'params',
		errorMessage: 'Wrong name format',
		trim: true,
		isString: true,
		optional: true,
		notEmpty: true,
	},
	sort: {
		in: 'params',
		errorMessage: 'Wrong sort format',
		custom: {
			options: (orderBy) => {
				const order = Object.entries(TASK_ORDER_BY).find(([_key, value]) => value === orderBy);
				if (!order) {
					throw new ValidationError(CODE_ERRORS.TASK_QUERY('order_by'));
				}
				return true;
			},
		},
		trim: true,
		isString: true,
		optional: true,
		notEmpty: true,
	},
	status: {
		in: 'params',
		errorMessage: 'Wrong status format',
		custom: {
			options: (value) => {
				const status = Object.entries(TASK_STATUS).find(([_key, taskStatus]) => taskStatus === value);
				if (!status) {
					throw new ValidationError(CODE_ERRORS.TASK_QUERY('status'));
				}
				return true;
			},
		},
		trim: true,
		isString: true,
		optional: true,
		notEmpty: true,
	},
	progress: {
		in: 'params',
		errorMessage: 'Wrong progress format',
		custom: {
			options: (value) => {
				const status = Object.entries(SOLUTION_STATUS).find(
					([_key, solutionStatus]) => solutionStatus === value,
				);
				if (!status) {
					throw new ValidationError(CODE_ERRORS.TASK_QUERY('progress'));
				}
				return true;
			},
		},
		trim: true,
		isString: true,
		optional: true,
		notEmpty: true,
	},
	rank: {
		in: 'params',
		errorMessage: 'Wrong rank format',
		isInt: true,
		optional: true,
		notEmpty: true,
	},
	tags: {
		in: 'params',
		errorMessage: 'Wrong tags format',
		custom: {
			options: (value: string) => {
				const tags = value.split(TASK_QUERY_SEPARATOR).filter((v) => Boolean(v.length));
				if (!tags.length) {
					throw new ValidationError(CODE_ERRORS.TASK_QUERY('tags'));
				}
				return true;
			},
		},
		customSanitizer: {
			options: (value: string) => value.split(TASK_QUERY_SEPARATOR),
		},
		trim: true,
		isString: true,
		optional: true,
		notEmpty: true,
	},
	page: {
		in: 'body',
		errorMessage: 'Wrong page format',
		isInt: true,
	},
});
