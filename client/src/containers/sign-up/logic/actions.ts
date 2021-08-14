import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const setGithub = createAction<actionTypes.TSetGithubArgs>(actionTypes.SET_GITHUB);

export const signUpUser = createAction<actionTypes.TSignUpArgs>(actionTypes.SIGN_UP_USER);
export const continueByGithub = createAction<actionTypes.TContrinueByGithubArgs>(actionTypes.CONTINUE_BY_GITHUB);
export const signUpUserByGithub = createAction<actionTypes.TSignUpByGithubArgs>(actionTypes.SIGN_UP_BY_GITHUB);
export const signUpUserSuccess = createAction(actionTypes.SIGN_UP_USER_SUCCESS);
export const signUpUserError = createAction<{ error: string }>(actionTypes.SIGN_UP_USER_ERROR);
