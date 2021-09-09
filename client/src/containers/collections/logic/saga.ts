import { getAuthoredCollections } from './../../../services/collections.service';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';

function* fetchCollectionsWorker({ userId }: ReturnType<typeof actions.fetchCollections>): any {
	yield put(actions.startLoading());
	const { collections } = yield call(getAuthoredCollections, { userId, skip: 0, take: 10 });
	console.log(collections);
	yield put(actions.setCollections({ collections }));
	yield put(actions.endLoading());
}

function* fetchCollectionsWatcher() {
	yield takeEvery(actionTypes.FETCH_COLLECTIONS, fetchCollectionsWorker);
}

export default function* CollectionsSaga() {
	yield all([fetchCollectionsWatcher()]);
}
