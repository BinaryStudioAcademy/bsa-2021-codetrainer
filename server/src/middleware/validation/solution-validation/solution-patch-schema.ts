import { checkSchema } from 'express-validator';
import { codeSchema, statusSchema, testCasesSchema } from './solution-field-schema';

export const solutionPatchSchema = checkSchema({
	code: { ...codeSchema, optional: true },
	testCases: { ...testCasesSchema, optional: true },
	status: statusSchema,
});
