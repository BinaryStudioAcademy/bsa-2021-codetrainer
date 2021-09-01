import { TypeTest } from '../../../types';
import { SOLUTION_STATUS } from '../data';

export const SOLUTION_STATUS_SCHEMA: Partial<Record<SOLUTION_STATUS, any>> = {
	skipped: 'skipped',
	unLocked: 'unLocked',
};

export const SOLUTION_TYPE_SCHEMA: Partial<Record<TypeTest, any>> = {
	testSolution: 'testSolution',
	testSolutionAttempt: 'testSolutionAttempt',
};
