import { all } from 'redux-saga/effects';
import exampleSaga from 'containers/example/logic/saga';
import clansSaga from 'containers/clans/logic/saga';

export default function* rootSaga() {
	yield all([exampleSaga(), clansSaga()]);
}
