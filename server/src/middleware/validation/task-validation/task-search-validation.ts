import { checkSchema } from 'express-validator';
import { CODE_ERRORS, SEARCH_PROGRESS, TASK_ORDER_BY, TASK_QUERY_SEPARATOR, TASK_STATUS } from '../../../common';
import { ValidationError } from '../../../helpers';

export const taskSearchSchema = checkSchema({
	q: {
		in: 'query',
		errorMessage: 'Wrong name format',
		trim: true,
		isString: true,
		optional: true,
		notEmpty: true,
	},
	sort: {
		in: 'query',
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
		in: 'query',
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
		in: 'query',
		errorMessage: 'Wrong progress format',
		custom: {
			options: (value) => {
				const status = Object.entries(SEARCH_PROGRESS).find(
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
		in: 'query',
		errorMessage: 'Wrong rank format',
		isInt: true,
		optional: true,
		notEmpty: true,
	},
	tags: {
		in: 'query',
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
		optional: true,
		notEmpty: true,
	},
	page: {
		in: 'query',
		errorMessage: 'Wrong page format',
		custom: {
			options: (value) => {
				const page = Number(value);
				if (typeof page !== 'number' || Number.isNaN(page)) {
					throw new ValidationError(CODE_ERRORS.TASK_QUERY('page'));
				}
				return true;
			},
		},
		customSanitizer: {
			options: (value) => Number(value),
		},
		notEmpty: true,
	},
});
