import { all } from 'redux-saga/effects';
import exampleSaga from 'containers/example/logic/saga';

export default function* rootSaga() {
	yield all([exampleSaga()]);
}
