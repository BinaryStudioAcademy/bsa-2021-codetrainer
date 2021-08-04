import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const showNotification = createAction<actionTypes.TShowNotificationArgs>(actionTypes.SHOW_NOTIFICATION);
