import { NotificationType } from './models';

export const SHOW_NOTIFICATION = 'NOTIFICATION:SHOW_NOTIFICATION';

export type TShowNotificationArgs = {
	notification: null | {
		notificationType: NotificationType;
		message: string;
		title?: string;
	};
};
