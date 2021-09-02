import { SOLUTION_STATUS } from '../../common';

export const checkStatusSolution = ({
	failure,
	passes,
}: {
	failure?: Array<unknown>;
	passes?: Array<unknown>;
} = {}): SOLUTION_STATUS => {
	const isError = failure && Boolean(failure.length);
	const passed = passes && Boolean(passes.length) ? SOLUTION_STATUS.COMPLETED : SOLUTION_STATUS.NOT_COMPLETED;
	return isError ? SOLUTION_STATUS.NOT_COMPLETED : passed;
};
