import { all, put, call, takeLatest } from 'redux-saga/effects';
import { authServices } from 'services';
import * as actionTypes from './action-types';
import * as actions from './actions';
import * as userActions from 'containers/user/logic/actions';
import { IUser } from 'typings/webapi';

export function* signUpUser(action: ReturnType<typeof actions.signUpUser>) {
	try {
		const { userData } = action;
		const user: IUser = yield call({ context: authServices, fn: authServices.register }, userData);
		yield put(actions.signUpUserSuccess());
		yield put(userActions.setUser({ user }));
	} catch (error) {
		yield put(actions.signUpUserError({ error: error?.message ?? 'unknown error' }));
	}
}

export function* watchSignUpUser() {
	yield takeLatest(actionTypes.SIGN_UP_USER, signUpUser);
}

export default function* signUpSaga() {
	yield all([watchSignUpUser()]);
}
