import { all } from 'redux-saga/effects';
import exampleSaga from 'containers/example/logic/saga';
import clansSaga from 'containers/clans/clans/logic/saga';
import clanSaga from 'containers/clans/clan/logic/saga';

export default function* rootSaga() {
	yield all([exampleSaga(), clansSaga(), clanSaga()]);
}
