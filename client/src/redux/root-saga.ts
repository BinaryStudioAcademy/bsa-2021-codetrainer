import { all } from 'redux-saga/effects';
import exampleSaga from 'containers/example/logic/saga';
import signInSaga from 'containers/sign-in/logic/saga';
import signUpSaga from 'containers/sign-up/logic/saga';

export default function* rootSaga() {
	yield all([exampleSaga(), signInSaga(), signUpSaga()]);
}
