import { NotificationType } from './models';
import { ReactNode } from 'react';

export interface INotification {
	notificationType: NotificationType;
	message: ReactNode;
	title?: string;
	id?: string;
}

export interface INotificationState {
	// state: null | {
	// 	notificationType: NotificationType;
	// 	message: string;
	// 	title?: string;
	// };
	notifications: [] | INotification[];
}

export const initialState: INotificationState = {
	notifications: [],
};
