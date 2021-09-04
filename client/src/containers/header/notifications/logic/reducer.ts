import { createReducer } from 'helpers/create-reducer.helper';
import { NotificationsActionTypes, TSetNotificationsArgs } from './action-types';
import { addNotification, editNotification } from './actions';
import { TNotificationsState } from './state';

const initial: TNotificationsState = new Map();
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
	[NotificationsActionTypes.Set](state, action: TSetNotificationsArgs) {
		const { notifications } = action;
		const newState: TNotificationsState = new Map(state);
		notifications.map((n) => {
			newState.set(n.id, n);
		});
		return newState;
	},
});
