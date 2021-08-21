import { TNotification } from 'typings/common/INotification';

export enum NotificationsActionTypes {
	Add = 'NOTIFICATIONS_ADD',
	Edit = 'NOTIFICATIONS_EDIT',
	Read = 'NOTIFICATIONS_READ',
}

export type TAddNotificationArgs = {
	notification: TNotification;
};

export type TEditNotificationArgs = {
	id: string;
	value: TNotification;
};

export type TReadNotificationArgs = {
	id: string;
};
