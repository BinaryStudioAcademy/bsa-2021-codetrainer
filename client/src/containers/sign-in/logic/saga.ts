import { all, put, call, takeLatest } from 'redux-saga/effects';
import { signIn } from 'services/sign-in.service';
import * as actionTypes from './action-types';
import * as actions from './actions';

export function* signInUser(action: ReturnType<typeof actions.signInUser>) {
	try {
		const { user } = action;
		yield call(signIn, user);
		yield put(actions.signInUserSuccess({ user }));
	} catch (error) {
		yield put(actions.signInUserError({ error }));
	}
}

export function* watchSignInUser() {
	yield takeLatest(actionTypes.SIGN_IN_USER, signInUser);
}

export default function* signInSaga() {
	yield all([watchSignInUser()]);
}
