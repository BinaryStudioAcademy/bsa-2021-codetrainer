import * as actionTypes from './action-types';
import { INotificationState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const notificationReducer = createReducer<INotificationState>(initialState, {
	[actionTypes.SET_NOTIFICATION_STATE](state, action: actionTypes.TSetNotificationStateArgs) {
		return {
			...state,
			notifications: action
				? [
						...state.notifications,
						{
							notificationType: action.notificationType,
							message: action.message,
							id: String(new Date()),
						},
				  ]
				: [],
		};
	},
	[actionTypes.REMOVE_NOTIFICATION](state, action: actionTypes.TRemoveNotificationArgs) {
		return {
			...state,
			notifications: action.notifications,
		};
	},
	[actionTypes.SET_ID](state, action: actionTypes.TSetId) {
		state.notifications[state.notifications.length - 1].id = action.id;
		return {
			...state,
			notifications: state.notifications,
		};
	},
});
