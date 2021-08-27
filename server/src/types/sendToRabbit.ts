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
	solutionId?: string;
}
