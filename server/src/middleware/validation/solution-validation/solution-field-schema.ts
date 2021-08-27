import { Schema } from 'express-validator';
import { CODE_ERRORS, SOLUTION_STATUS_SCHEMA } from '../../../common';
import { ValidationError } from '../../../helpers';

export const solutionFieldSchema =
	(schema: Record<string, string>, error: { message: string; status?: number }) =>
	(data: any): boolean => {
		const statusInBody = Object.entries(schema).find(([_key, value]) => value === data);
		if (!statusInBody) {
			throw new ValidationError(error);
		}
		return true;
	};

export const codeSchema: Schema[''] = {
	in: 'body',
	errorMessage: 'Wrong code format',
	trim: true,
	isString: true,
	notEmpty: true,
};

export const testCasesSchema: Schema[''] = {
	in: 'body',
	errorMessage: 'Wrong testCases format',
	trim: true,
	isString: true,
	notEmpty: true,
};

export const statusSchema: Schema[''] = {
	in: 'body',
	errorMessage: 'Wrong status format',
	custom: {
		options: solutionFieldSchema(SOLUTION_STATUS_SCHEMA, CODE_ERRORS.SOLUTION_STATUS_WRONG),
	},
	trim: true,
	isString: true,
	optional: true,
	notEmpty: true,
};
