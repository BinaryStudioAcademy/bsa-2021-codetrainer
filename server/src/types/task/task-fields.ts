import { TASK_STATUS } from '../../common';
import { IUserFields } from '../user';

export interface ITaskFields {
	id: string;
	name: string;
	difficulty: number;
	testCase?: string;
	testCaseSample?: string;
	description?: string;
	initialSolution?: string;
	completeSolution?: string;
	status: TASK_STATUS;
	isPublished: boolean;
	user: IUserFields;
}
