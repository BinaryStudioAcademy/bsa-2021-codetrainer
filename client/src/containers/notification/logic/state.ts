import { NotificationType } from './models';

export interface INotificationState {
	showNotification: boolean;
	notificationType?: NotificationType;
	message?: string;
	title?: string;
}

export const initialState: INotificationState = {
	showNotification: false,
};
