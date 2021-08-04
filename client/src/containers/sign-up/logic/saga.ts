import { all, put, call, takeLatest } from 'redux-saga/effects';
import { signUp } from 'services/signup.service';

import * as actionTypes from './action-types';
import * as actions from './actions';

export function* signUpUser(action: ReturnType<typeof actions.signUpUser>) {
	try {
		const { user } = action;
		//@ts-ignore
		yield call(signUp, user);
		yield put({ type: actionTypes.SIGN_UP_USER_SUCCESS });
	} catch (error) {
		yield put({ type: actionTypes.SIGN_UP_USER_ERROR });
	}
}

export function* watchSignUpUser() {
	yield takeLatest(actionTypes.SIGN_UP_USER, signUpUser);
}

export default function* signUpSaga() {
	yield all([watchSignUpUser()]);
}
