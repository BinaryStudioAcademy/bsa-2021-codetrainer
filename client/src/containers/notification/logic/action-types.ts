import { NotificationType } from './models';
import { INotification } from './state';
import { ReactNode } from 'react';

export const SET_NOTIFICATION_STATE = 'NOTIFICATION:SET_NOTIFICATION_STATE';
export const REMOVE_NOTIFICATION = 'NOTIFICATION:REMOVE_NOTIFICATION';
export const SET_ID = 'NOTIFICATION:SET_ID';

export type TSetNotificationStateArgs = null | {
	notificationType: NotificationType;
	message: ReactNode;
	title?: string;
};

export type TRemoveNotificationArgs = {
	notifications: INotification[];
};

export type TSetId = {
	id: string;
};
