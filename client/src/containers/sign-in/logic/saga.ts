import { ROUTES } from 'constants/routes';
import historyHelper from 'helpers/history.helper';
import { all, put, call, takeLatest } from 'redux-saga/effects';
import { authServices, githubAuthService } from 'services';
import { IUser } from 'typings/common/IUser';
import * as userActions from 'containers/user/logic/actions';
import * as actionTypes from './action-types';
import * as actions from './actions';

export function* signInUser(action: ReturnType<typeof actions.signInUser>) {
	try {
		const { userData } = action;
		const user: IUser = yield call({ context: authServices, fn: authServices.login }, userData);
		yield put(userActions.setUser({ user }));
		historyHelper.push(ROUTES.Home);
	} catch (error) {
		historyHelper.push(ROUTES.SignIn);
		yield put(actions.signInUserError({ error: error?.message ?? 'unknown error' }));
	}
}

export function* signInUserByGithub(action: ReturnType<typeof actions.signInUserByGithub>) {
	try {
		const { code } = action;
		const user: IUser = yield call({ context: githubAuthService, fn: githubAuthService.loginByGithub }, code);
		yield put(userActions.setUser({ user }));
		historyHelper.push(ROUTES.Home);
	} catch (error) {
		historyHelper.push(ROUTES.SignIn);
		yield put(actions.signInUserError({ error: error?.message ?? 'unknown error' }));
	}
}

export function* watchSignInUser() {
	yield takeLatest(actionTypes.SIGN_IN_USER, signInUser);
}

export function* watchSignInUserByGithub() {
	yield takeLatest(actionTypes.SIGN_IN_USER_BY_GITHUB, signInUserByGithub);
}

export default function* signInSaga() {
	yield all([watchSignInUser(), watchSignInUserByGithub()]);
}
