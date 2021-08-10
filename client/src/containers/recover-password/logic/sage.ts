import { authServices } from 'services';
import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';

export function* fetchForgotPassword({ payload }: ReturnType<typeof actions.forgotPassword>) {
	try {
		yield put(actions.recoverPasswordStateReset());
		yield call({ context: authServices, fn: authServices.forgotPassword }, payload);
		yield put(actions.recoverPasswordSuccess());
	} catch (error) {
		yield put(actions.recoverPasswordError({ payload: error?.errors ?? error?.message ?? 'unknown error' }));
	}
}

export function* fetchResetPassword({ payload }: ReturnType<typeof actions.resetPassword>) {
	try {
		yield put(actions.recoverPasswordStateReset());
		yield call({ context: authServices, fn: authServices.resetPassword }, payload);
		yield put(actions.recoverPasswordSuccess());
	} catch (error) {
		yield put(actions.recoverPasswordError({ payload: error?.errors ?? error?.message ?? 'unknown error' }));
	}
}

function* watchForgotPassword() {
	yield takeLatest(actionTypes.FORGOT_PASSWORD, fetchForgotPassword);
}

function* watchResetPassword() {
	yield takeLatest(actionTypes.RESET_PASSWORD, fetchResetPassword);
}

export default function* RecoverPasswordSaga() {
	yield all([watchForgotPassword(), watchResetPassword()]);
}
