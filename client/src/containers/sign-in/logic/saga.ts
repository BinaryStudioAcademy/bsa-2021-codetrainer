import { all, put, call, takeLatest } from 'redux-saga/effects';
import { authServices } from 'services';
import { IUser } from 'typings/webapi';
import * as userActions from 'containers/user/logic/actions';
import * as actionTypes from './action-types';
import * as actions from './actions';

export function* signInUser(action: ReturnType<typeof actions.signInUser>) {
	try {
		const { userData } = action;
		const user: IUser = yield call({ context: authServices, fn: authServices.login }, userData);
		yield put(userActions.setUser({ user }));
		yield put(actions.signInUserSuccess());
	} catch (error) {
		yield put(actions.signInUserError({ error: error?.message ?? 'unknown error' }));
	}
}

export function* watchSignInUser() {
	yield takeLatest(actionTypes.SIGN_IN_USER, signInUser);
}

export default function* signInSaga() {
	yield all([watchSignInUser()]);
}
