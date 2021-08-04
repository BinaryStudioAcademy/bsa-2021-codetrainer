import { all, put, call, takeLatest } from 'redux-saga/effects';
import { signUp } from 'services/sign-up.service';

import * as actionTypes from './action-types';
import * as actions from './actions';

export function* signUpUser(action: ReturnType<typeof actions.signUpUser>) {
	try {
		const { user } = action;
		yield call(signUp, user);
		yield put(actions.signUpUserSuccess({ user }));
	} catch (error) {
		yield put(actions.signUpUserError({ error }));
	}
}

export function* watchSignUpUser() {
	yield takeLatest(actionTypes.SIGN_UP_USER, signUpUser);
}

export default function* signUpSaga() {
	yield all([watchSignUpUser()]);
}
