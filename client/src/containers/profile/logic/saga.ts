import { fetchUsersSearch } from 'services';
import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';

export function* fetchUserSearch({ partialFilter }: ReturnType<typeof actions.searchFetchData>) {
    try {
        debugger;
        yield put(actions.searchBeforeFetch());
        //@ts-ignore
        const data: any = yield call(fetchUsersSearch, partialFilter);
        yield put(actions.searchSuccess());
        yield put(actions.searchSetData({ data }));
    } catch (error) {
        yield put(actions.searchError({ payload: error?.errors ?? error?.message ?? 'unknown error' }));
    }
}

function* watchFetchSearch() {
    yield takeLatest(actionTypes.SEARCH_FETCH, fetchUserSearch);
}

export default function* SearchSaga() {
    yield all([watchFetchSearch()]);
}
