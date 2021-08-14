import { authServices } from 'services';
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
	yield put(signInActions.signInDataClear())
	yield put(signUpActions.signUpDataClear())
}

function* watchCheckToken() {
	yield takeEvery(actionTypes.USER_CHECK_TOKEN, fetchCheckToken);
}

export function* watchLogout() {
	yield takeEvery(actionTypes.USER_LOGOUT, fetchUserLogout);
}

export default function* UserSaga() {
	yield all([watchCheckToken(), watchLogout()]);
}
