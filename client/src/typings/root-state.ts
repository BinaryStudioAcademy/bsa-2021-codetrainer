import { ICreateTaskState } from 'containers/create-new-task/logic/state';
import { IExampleState } from 'containers/example/logic/state';
import { IAuthState } from './auth';
import { IAuthState as IRoutingState } from 'containers/routing/logic/state';
import { IProfileState } from 'containers/profile/logic/state';
import { INotificationState } from '../containers/notification/logic/state';

export interface IRootState {
	notification: INotificationState;
	profile: IProfileState;
	createTask: ICreateTaskState;
	example: IExampleState;
	auth: IAuthState;
	routing: IRoutingState;
}
