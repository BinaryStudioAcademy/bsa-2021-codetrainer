import { fetchTasksSearch } from 'services';
import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { ISearchState } from './state';

export function* fetchSearch({ partialFilter }: ReturnType<typeof actions.searchFetchData>) {
	try {
		yield put(actions.searchBeforeFetch());
		const data: ISearchState['search'] = yield call(fetchTasksSearch, partialFilter);
		yield put(actions.searchSuccess());
		yield put(actions.searchSetData({ data }));
	} catch (error) {
		const err = error as Error;
		yield put(actions.searchError({ payload: err?.message ?? 'unknown error' }));
	}
}

export function* fetchSearchNextPage({ partialFilter }: ReturnType<typeof actions.searchFetchData>) {
	try {
		yield put(actions.searchBeforeFetchNextPage());
		const data: ISearchState['search'] = yield call(fetchTasksSearch, partialFilter);
		yield put(actions.searchSuccess());
		yield put(actions.searchAddDataNextPage({ data }));
	} catch (error) {
		const err = error as Error;
		yield put(actions.searchError({ payload: err?.message ?? 'unknown error' }));
	}
}

function* watchFetchSearch() {
	yield takeLatest(actionTypes.SEARCH_FETCH, fetchSearch);
}

function* watchFetchNextPage() {
	yield takeLatest(actionTypes.SEARCH_FETCH_NEXT_PAGE, fetchSearchNextPage);
}

export default function* SearchSaga() {
	yield all([watchFetchSearch(), watchFetchNextPage()]);
}
