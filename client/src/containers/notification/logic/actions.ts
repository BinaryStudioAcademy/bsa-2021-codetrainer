import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const setNotificationState = createAction<actionTypes.TSetNotificationStateArgs>(
	actionTypes.SET_NOTIFICATION_STATE,
);
export const removeNotification = createAction<actionTypes.TRemoveNotificationArgs>(actionTypes.REMOVE_NOTIFICATION);
export const setId = createAction<actionTypes.TSetId>(actionTypes.SET_ID);
