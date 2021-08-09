import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const addAuthUser = createAction<actionTypes.TAuthUser>(actionTypes.AUTH_USER);

export const checkRefreshToken = createAction(actionTypes.AUTH_CHECK_TOKEN);

export const setAuthAccessTokenLoading = createAction<actionTypes.TAuthAccessTokenLoading>(
	actionTypes.AUTH_ACCESS_TOKEN_LOADING,
);

export const logoutUser = createAction(actionTypes.AUTH_LOGOUT);
