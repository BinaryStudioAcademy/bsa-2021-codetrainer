import * as actionTypes from './action-types';
import { INotificationState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const notificationReducer = createReducer<INotificationState>(initialState, {
	[actionTypes.SET_NOTIFICATION_STATE](state, action: actionTypes.TSetNotificationArgs) {
		return {
			...state,
			state: action.state ? { ...action.state, id: String(new Date()) } : null,
		};
	},
});
