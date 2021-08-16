import { authServices } from 'services';
import { updateUser } from 'services/settings.service';

import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { UserAccessToken, IUserDataState } from './state';
import * as signInActions from 'containers/sign-in/logic/actions';
import * as signUpActions from 'containers/sign-up/logic/actions';

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
		const { id, user } = action;
		console.log({action});
		yield call(updateUser, {id, body:user});
		yield put(actions.setUser({ user }));
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

export default function* UserSaga() {
	yield all([watchCheckToken(), watchLogout(), watchUserUpdate()]);
}
