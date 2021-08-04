import * as actionTypes from './action-types';
import { INotificationState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const notificationReducer = createReducer<INotificationState>(initialState, {
	[actionTypes.SHOW_NOTIFICATION](state, action: actionTypes.TShowNotificationArgs) {
		return {
			...state,
			showNotification: action.showNotification,
			message: action.message,
			notificationType: action.notificationType,
			title: action.title,
		};
	},
});
