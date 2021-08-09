import { all } from 'redux-saga/effects';
import signInSaga from './../../sign-in/logic/saga';
import signUpSaga from './../../sign-up/logic/saga';

export default function* authSaga() {
	yield all([signInSaga(), signUpSaga()]);
}
