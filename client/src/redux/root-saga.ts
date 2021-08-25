import { all } from 'redux-saga/effects';
import exampleSaga from 'containers/example/logic/saga';
import clansSaga from 'containers/clans/clans/logic/saga';
import clanSaga from 'containers/clans/clan/logic/saga';
import authSaga from 'containers/auth/logic/saga';
import homeSaga from 'containers/home-page/logic/saga';
import settingsSaga from 'containers/setting-page/logic/saga';
import searchSaga from 'containers/search-page/logic/saga';
import taskSaga from 'containers/task-train/logic/saga';
import headerSaga from 'containers/header/logic/saga';
import profileSaga from 'containers/profile/logic/saga';

export default function* rootSaga() {
	yield all([
		exampleSaga(),
		authSaga(),
		clansSaga(),
		clanSaga(),
		searchSaga(),
		settingsSaga(),
		profileSaga(),
		homeSaga(),
		taskSaga(),
		headerSaga(),
	]);
}
