import { IProfileState } from 'containers/profile/logic/state';
import { IExampleState } from 'containers/example/logic/state';
import { ICreateTaskState } from 'containers/create-new-task/logic/state';

export interface IRootState {
	example: IExampleState;
	profile: IProfileState;
	createTask: ICreateTaskState;
}
