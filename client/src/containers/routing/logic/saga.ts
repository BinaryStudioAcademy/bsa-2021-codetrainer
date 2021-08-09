import { authServices } from 'services';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { AuthAccessToken, IAuthState } from './state';

export function* fetchAuthCheckToken() {
	yield put(actions.setAuthAccessTokenLoading({ accessToken: AuthAccessToken.LOADING }));
	const user: IAuthState['user'] = yield call([authServices, authServices.refreshToken]);
	yield put(actions.addAuthUser({ user }));
	yield put(actions.setAuthAccessTokenLoading({ accessToken: AuthAccessToken.LOADED }));
}

function* fetchAuthLogout() {
	yield call([authServices, authServices.logout]);
	yield put(actions.addAuthUser({ user: null }));
}

function* watchAuthCheckToken() {
	yield takeEvery(actionTypes.AUTH_CHECK_TOKEN, fetchAuthCheckToken);
}

export function* watchAuthLogout() {
	yield takeEvery(actionTypes.AUTH_LOGOUT, fetchAuthLogout);
}

export default function* AuthSaga() {
	yield all([watchAuthCheckToken(), watchAuthLogout()]);
}
