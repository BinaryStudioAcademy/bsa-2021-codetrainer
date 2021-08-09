import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const signInUser = createAction<actionTypes.TSignInArgs>(actionTypes.SIGN_IN_USER);
export const signInUserSuccess = createAction<actionTypes.TSignInSuccessArgs>(actionTypes.SIGN_IN_USER_SUCCESS);
export const signInUserError = createAction<{ error: string }>(actionTypes.SIGN_IN_USER_ERROR);