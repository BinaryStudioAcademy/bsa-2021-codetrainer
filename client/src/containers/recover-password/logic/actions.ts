import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const recoverPasswordSuccess = createAction(actionTypes.RECOVER_PASSWORD_SUCCESS);

export const recoverPasswordError = createAction<actionTypes.TRecoverPasswordError>(actionTypes.RECOVER_PASSWORD_ERROR);

export const recoverPasswordStateReset = createAction(actionTypes.RECOVER_PASSWORD_STATE_RESET);

export const recoverPasswordBeforeFetch = createAction(actionTypes.RECOVER_PASSWORD_BEFORE_FETCH);

export const forgotPassword = createAction<actionTypes.TForgotPassword>(actionTypes.FORGOT_PASSWORD);

export const resetPassword = createAction<actionTypes.TResetPassword>(actionTypes.RESET_PASSWORD);
