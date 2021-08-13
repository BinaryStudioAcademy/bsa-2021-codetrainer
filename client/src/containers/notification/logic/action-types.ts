import { NotificationType } from './models';

export const SET_NOTIFICATION_STATE = 'NOTIFICATION:SET_NOTIFICATION_STATE';

export type TSetNotificationArgs = {
	state: null | {
		notificationType: NotificationType;
		message: string;
		title?: string;
	};
};
