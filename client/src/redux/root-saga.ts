import { all } from 'redux-saga/effects';
import exampleSaga from 'containers/example/logic/saga';
import profileSaga from 'containers/routing/logic/saga';

export default function* rootSaga() {
	yield all([exampleSaga(), profileSaga()]);
}
