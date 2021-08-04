import { NotificationType } from './models';

export const SHOW_NOTIFICATION = 'NOTIFICATION:SHOW_NOTIFICATION';

export type TShowNotificationArgs = {
	showNotification: boolean;
	notificationType?: NotificationType;
	message?: string;
	title?: string;
};
