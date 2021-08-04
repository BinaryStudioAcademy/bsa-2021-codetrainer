import * as actionTypes from './action-types';
import { INotificationState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const notificationReducer = createReducer<INotificationState>(initialState, {
	[actionTypes.SHOW_NOTIFICATION](state, action: actionTypes.TShowNotificationArgs) {
		console.log({ action });
		return {
			...state,
			notification: action.notification ? { ...action.notification, id: +new Date() } : null,
		};
	},
});
