import { mapUserResponseToUser } from 'helpers/user.helper';
import { WebApi } from 'typings/webapi';
import { authServices } from 'services';
import { updateUser, deleteUser } from 'services/settings.service';
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from 'containers/notification/logic/models';

import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { UserAccessToken, IUserDataState } from './state';
import * as signInActions from 'containers/sign-in/logic/actions';
import * as signUpActions from 'containers/sign-up/logic/actions';
import { IUser } from 'typings/common/IUser';

export function* fetchCheckToken() {
	yield put(actions.setUserAccessTokenLoading({ accessToken: UserAccessToken.LOADING }));
	const user: IUserDataState['user'] = yield call([authServices, authServices.refreshToken]);
	yield put(actions.setUser({ user }));
	yield put(actions.setUserAccessTokenLoading({ accessToken: UserAccessToken.LOADED }));
}

function* fetchUserLogout() {
	yield call([authServices, authServices.logout]);
	yield put(actions.setUser({ user: null }));
	yield put(signInActions.signInDataClear());
	yield put(signUpActions.signUpDataClear());
}

function* fetchUserUpdate(action: ReturnType<typeof actions.updateUser>): any {
	try {
		const { user } = action;
		const newUser: WebApi.Entities.IUser = yield call(updateUser, user);
		const userProfile: IUser = yield call(mapUserResponseToUser, newUser);
		yield put(actions.setUser({ user: userProfile }));
		yield put(
			setNotificationState({
				state: {
					notificationType: NotificationType.Success,
					message: 'User updated',
					title: 'Update user',
				},
			}),
		);
	} catch (error) {
		yield put(
			setNotificationState({
				state: {
					notificationType: NotificationType.Error,
					message: error instanceof Error ? error?.message : 'Unknown error',
					title: 'Update user',
				},
			}),
		);
	}
}

function* fetchUserDelete(action: ReturnType<typeof actions.deleteUser>): any {
	try {
		const { id } = action;
		yield put(actions.logoutUser());
		yield call(deleteUser, id);
	} catch (error) {
		console.log(error);
	}
}

function* watchCheckToken() {
	yield takeEvery(actionTypes.USER_CHECK_TOKEN, fetchCheckToken);
}

export function* watchLogout() {
	yield takeEvery(actionTypes.USER_LOGOUT, fetchUserLogout);
}

function* watchUserUpdate() {
	yield takeEvery(actionTypes.UPDATE_USER, fetchUserUpdate);
}

function* watchUserDelete() {
	yield takeEvery(actionTypes.DELETE_USER, fetchUserDelete);
}

export default function* UserSaga() {
	yield all([watchCheckToken(), watchLogout(), watchUserUpdate(), watchUserDelete()]);
}
