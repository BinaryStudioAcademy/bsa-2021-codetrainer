import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const signInUser = createAction<actionTypes.TSignInArgs>(actionTypes.SIGN_IN_USER);
export const signInUserSuccess = createAction(actionTypes.SIGN_IN_USER_SUCCESS);
export const signInUserError = createAction<{ error: string }>(actionTypes.SIGN_IN_USER_ERROR);
export const signInDataClear = createAction(actionTypes.SIGN_IN_DATA_CLEAR);
