import { IExampleState } from 'containers/example/logic/state';
import { IAuthState } from 'containers/auth/logic/state';
import { IProfileState } from 'containers/profile/logic/state';
import { INotificationState } from '../containers/notification/logic/state';

export interface IRootState {
	notification: INotificationState;
	profile: IProfileState;
	example: IExampleState;
	auth: IAuthState;
}
