import { TypeTest } from 'constants/task';
import { WebApi } from 'typings/webapi';

export interface ITest {
	result: {
		success?: boolean;
		error?: string;
		response?: {
			stats: {
				failure: number;
				duration: number;
			};
		};
	};
	typeTest: TypeTest;
}

export interface ITaskState {
	task: WebApi.Entities.IChallenge | null;
	solution: WebApi.Entities.ISolution | null;
	errors: unknown | null;
	hasFetched: boolean;
	test: ITest | null;
	activeTab: number;
}

export const initialState: ITaskState = {
	task: null,
	solution: null,
	hasFetched: false,
	errors: null,
	test: null,
	activeTab: 0,
};
