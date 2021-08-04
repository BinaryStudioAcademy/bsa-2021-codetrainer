import { IExampleState } from 'containers/example/logic/state';
import { INotificationState } from '../containers/notification/logic/state';

export interface IRootState {
	example: IExampleState;
	notification: INotificationState;
}
