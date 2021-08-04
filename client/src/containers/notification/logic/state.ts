import { NotificationType } from './models';

export interface INotificationState {
	notification: null | {
		notificationType: NotificationType;
		message: string;
		title?: string;
		id?: number;
	};
}

export const initialState: INotificationState = {
	notification: null,
};
