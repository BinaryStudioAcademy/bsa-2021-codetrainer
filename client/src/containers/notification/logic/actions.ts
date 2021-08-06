import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const setNotificationState = createAction<actionTypes.TSetNotificationArgs>(actionTypes.SET_NOTIFICATION_STATE);
