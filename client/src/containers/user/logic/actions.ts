import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const setUser = createAction<actionTypes.TSignUserArgs>(actionTypes.SET_USER);
export const clearUser = createAction(actionTypes.CLEAR_USER);
