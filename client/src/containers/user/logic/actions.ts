import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const setUser = createAction<actionTypes.TSetUser>(actionTypes.SET_USER);
export const updateUser = createAction<actionTypes.TSetUser>(actionTypes.UPDATE_USER);
export const deleteUser = createAction<actionTypes.TDeleteUser>(actionTypes.DELETE_USER);
export const setUserClan = createAction<actionTypes.TSetUserClan>(actionTypes.SET_USER_CLAN);

export const checkRefreshToken = createAction(actionTypes.USER_CHECK_TOKEN);

export const setUserAccessTokenLoading = createAction<actionTypes.TUserAccessTokenLoading>(
	actionTypes.USER_ACCESS_TOKEN_LOADING,
);

export const logoutUser = createAction(actionTypes.USER_LOGOUT);

export const addTask = createAction<actionTypes.TUserAddTask>(actionTypes.ADD_TASK);
export const deleteTaskRedux = createAction<actionTypes.TUserDeleteTask>(actionTypes.DELETE_TASK);
