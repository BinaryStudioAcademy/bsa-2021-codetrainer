import { checkSchema } from 'express-validator';
import { CODE_ERRORS, SOLUTION_TYPE_SCHEMA } from '../../../common';
import { codeSchema, solutionFieldSchema, statusSchema, testCasesSchema } from './solution-field-schema';

export const solutionSchema = checkSchema({
	code: codeSchema,
	testCases: testCasesSchema,
	typeTest: {
		in: 'body',
		errorMessage: 'Wrong type format',
		custom: {
			options: solutionFieldSchema(SOLUTION_TYPE_SCHEMA, CODE_ERRORS.SOLUTION_TYPE_WRONG),
		},
		trim: true,
		isString: true,
		notEmpty: true,
	},
});
