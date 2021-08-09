import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const setUser = createAction<actionTypes.TSetUser>(actionTypes.SET_USER);

export const checkRefreshToken = createAction(actionTypes.USER_CHECK_TOKEN);

export const setUserAccessTokenLoading = createAction<actionTypes.TUserAccessTokenLoading>(
	actionTypes.USER_ACCESS_TOKEN_LOADING,
);

export const logoutUser = createAction(actionTypes.USER_LOGOUT);
