import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const setActiveTab = createAction<actionTypes.TSetActiveTabArgs>(actionTypes.SET_ACTIVE_TAB);
