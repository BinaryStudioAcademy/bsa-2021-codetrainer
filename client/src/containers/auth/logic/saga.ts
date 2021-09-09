import { all } from 'redux-saga/effects';
import userSaga from 'containers/user/logic/saga';
import signInSaga from './../../sign-in/logic/saga';
import signUpSaga from './../../sign-up/logic/saga';
import recoverSaga from 'containers/recover-password/logic/sage';

export default function* authSaga() {
	yield all([signInSaga(), signUpSaga(), userSaga(), recoverSaga()]);
}
