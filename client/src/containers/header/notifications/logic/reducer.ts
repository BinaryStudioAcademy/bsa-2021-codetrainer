import { createReducer } from 'helpers/create-reducer.helper';
import { notificationMocks } from '../mocks';
import { NotificationsActionTypes } from './action-types';
import { addNotification, editNotification } from './actions';
import { TNotificationsState } from './state';

const initial: TNotificationsState = new Map(notificationMocks.map((notification) => [notification.id, notification]));

export const notificationsReducer = createReducer<TNotificationsState>(initial, {
	[NotificationsActionTypes.Add](state, action: ReturnType<typeof addNotification>) {
		const { notification } = action;
		const copy = new Map(state);
		copy.set(notification.id, notification);
		return copy;
	},
	[NotificationsActionTypes.Edit](state, action: ReturnType<typeof editNotification>) {
		const { id, value } = action;
		const copy = new Map(state);
		copy.set(id, value);
		return copy;
	},
});
