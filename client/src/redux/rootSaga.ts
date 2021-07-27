import { all } from 'redux-saga/effects';
import exampleSaga from 'containers/Example/logic/saga';

export default function* rootSaga() {
	yield all([exampleSaga()]);
}
