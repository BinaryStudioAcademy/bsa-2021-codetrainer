import { NotificationType } from './models';

export interface INotificationState {
	state: null | {
		notificationType: NotificationType;
		message: string;
		title?: string;
		id?: string;
	};
}

export const initialState: INotificationState = {
	state: null,
};
