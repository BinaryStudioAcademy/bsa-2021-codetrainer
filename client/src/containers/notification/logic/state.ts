import { NotificationType } from './models';

export interface INotificationState {
	notification: null | {
		notificationType: NotificationType;
		message: string;
		title?: string;
	};
}

export const initialState: INotificationState = {
	notification: null,
};
