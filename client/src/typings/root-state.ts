import { ICreateTaskState } from 'containers/create-new-task/logic/state';
import { IExampleState } from 'containers/example/logic/state';
import { IClansState } from 'containers/clans/clans/logic/state';
import { IClanState } from 'containers/clans/clan/logic/state';
import { IAuthState } from 'containers/auth/logic/state';
import { IProfileState } from 'containers/profile/logic/state';
import { INotificationState } from '../containers/notification/logic/state';

export interface IRootState {
	notification: INotificationState;
	profile: IProfileState;
	clans: IClansState;
	clan: IClanState;
	createTask: ICreateTaskState;
	example: IExampleState;
	auth: IAuthState;
}
