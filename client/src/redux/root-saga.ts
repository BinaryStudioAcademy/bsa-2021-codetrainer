import { all } from 'redux-saga/effects';
import exampleSaga from 'containers/example/logic/saga';
import profileSaga from 'containers/routing/logic/saga';
import authSaga from 'containers/auth/logic/saga';

export default function* rootSaga() {
	yield all([exampleSaga(), authSaga(), profileSaga()]);
}
