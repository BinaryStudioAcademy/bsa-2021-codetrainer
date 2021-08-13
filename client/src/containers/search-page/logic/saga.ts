import { fetchTasksSearch } from 'services';
import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';

export function* fetchSearch(payload: ReturnType<typeof actions.searchFetchData>) {
	try {
		yield put(actions.searchBeforeFetch());
		yield call(fetchTasksSearch, payload);
		yield put(actions.searchSuccess());
	} catch (error) {
		yield put(actions.searchError({ payload: error?.errors ?? error?.message ?? 'unknown error' }));
	}
}

function* watchFetchSearch() {
	yield takeLatest(actionTypes.SEARCH_FETCH, fetchSearch);
}

export default function* SearchSaga() {
	yield all([watchFetchSearch()]);
}
