import { SOLUTION_STATUS } from '../common';

export enum TypeTest {
	TEST_TASK = 'testTask',
	TEST_SOLUTION_ATTEMPT = 'testSolutionAttempt',
	TEST_SOLUTION = 'testSolution',
}

export interface ISendToRabbit {
	typeTest: TypeTest;
	code: string;
	test: string;
	userId: string;
	taskId: string;
	solutionId: string;
	status: SOLUTION_STATUS;
}

export interface ITestResult {
	result: { success: boolean; response?: { failure: Array<unknown>; passes: Array<unknown> }; error?: Error };
	status?: SOLUTION_STATUS;
	token: string;
	userId: string;
	solutionId?: string;
	taskId: string;
	typeTest: TypeTest;
}
