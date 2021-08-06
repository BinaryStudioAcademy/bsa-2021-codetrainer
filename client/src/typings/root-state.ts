import { IExampleState } from 'containers/example/logic/state';
import { IProfileState } from 'containers/profile/logic/state';
import { IAuthState } from 'containers/routing/logic/state';
import { INotificationState } from '../containers/notification/logic/state';

export interface IRootState {
	notification: INotificationState;
	profile: IProfileState;
	example: IExampleState;
	auth: IAuthState;
}
