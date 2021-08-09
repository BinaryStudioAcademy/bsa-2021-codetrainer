import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const signUpUser = createAction<actionTypes.TSignUpArgs>(actionTypes.SIGN_UP_USER);
export const signUpUserSuccess = createAction(actionTypes.SIGN_UP_USER_SUCCESS);
export const signUpUserError = createAction<{ error: string }>(actionTypes.SIGN_UP_USER_ERROR);
