import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import * as userActions from 'containers/user/logic/actions';
import { IUser } from 'typings/common/IUser';
import { IGithubProfileWithEmail } from 'typings/common/IGithub';
import { authServices, githubAuthService } from 'services';
import { getProfileFromRegister } from 'services/github.service';
import { ROUTES } from 'constants/routes';
import historyHelper from 'helpers/history.helper';

export function* signUpUser(action: ReturnType<typeof actions.signUpUser>) {
	try {
		const { userData } = action;
		const user: IUser = yield call({ context: authServices, fn: authServices.register }, userData);
		yield put(userActions.setUser({ user }));
		historyHelper.push(ROUTES.Home);
		yield put(actions.setGithub({ github: undefined }));
	} catch (error) {
		historyHelper.push(ROUTES.SignUp);
		yield put(actions.signUpUserError({ error: error?.message ?? 'unknown error' }));
	}
}

export function* continueByGithub({ code }: ReturnType<typeof actions.continueByGithub>) {
	try {
		const github: IGithubProfileWithEmail = yield call(getProfileFromRegister, code);
		yield put(actions.setGithub({ github }));
		historyHelper.push(ROUTES.SignUp);
	} catch (error) {
		historyHelper.push(ROUTES.SignUp);
		yield put(actions.signUpUserError({ error: error?.message ?? 'unknown error' }));
	}
}

export function* signUpUserByGithub(action: ReturnType<typeof actions.signUpUserByGithub>) {
	try {
		const { userData } = action;
		const user: IUser = yield call(
			{ context: githubAuthService, fn: githubAuthService.registerByGithub },
			userData,
		);
		yield put(userActions.setUser({ user }));
		historyHelper.push(ROUTES.Home);
		yield put(actions.setGithub({ github: undefined }));
	} catch (error) {
		yield put(actions.signUpUserError({ error: error?.message ?? 'unknown error' }));
	}
}

export function* watchSignUpUser() {
	yield takeLatest(actionTypes.SIGN_UP_USER, signUpUser);
}

export function* watchSignUpUserByGithub() {
	yield takeLatest(actionTypes.SIGN_UP_BY_GITHUB, signUpUserByGithub);
}

export function* watchContinueByGithub() {
	yield takeLatest(actionTypes.CONTINUE_BY_GITHUB, continueByGithub);
}

export default function* signUpSaga() {
	yield all([watchSignUpUser(), watchSignUpUserByGithub(), watchContinueByGithub()]);
}
