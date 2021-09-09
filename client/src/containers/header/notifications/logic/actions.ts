import { createAction } from 'helpers/create-action.helper';
import {
	NotificationsActionTypes,
	TAddNotificationArgs,
	TEditNotificationArgs,
	TReadNotificationArgs,
	TSetNotificationsArgs,
} from './action-types';

export const addNotification = createAction<TAddNotificationArgs>(NotificationsActionTypes.Add);
export const editNotification = createAction<TEditNotificationArgs>(NotificationsActionTypes.Edit);
export const setNotifications = createAction<TSetNotificationsArgs>(NotificationsActionTypes.Set);
export const readNotification = createAction<TReadNotificationArgs>(NotificationsActionTypes.Read);
export const fetchNotification = createAction(NotificationsActionTypes.Fetch);
