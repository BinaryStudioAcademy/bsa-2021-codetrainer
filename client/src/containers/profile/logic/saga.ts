import { fetchUsersSearch } from 'services';
import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';

export function* fetchUserSearch({ query }: ReturnType<typeof actions.searchUser>) {
    try {
        yield put(actions.clearData());
        //@ts-ignore
        const userData: any = yield call(fetchUsersSearch, query);
        yield put(actions.searchUserSuccess(userData));
    } catch (error) {
        yield put(actions.searchUserError({ payload: error?.errors ?? error?.message ?? 'unknown error' }));
    }
}

function* watchFetchSearch() {
    yield takeLatest(actionTypes.SEARCH_USER_FETCH, fetchUserSearch);
}

export default function* SearchSaga() {
    yield all([watchFetchSearch()]);
}
