import { fetchTasksSearch } from 'services';
import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { ISearchState } from './state';
import { updateTaskFavoriteStatus } from 'services/task/tasks-search';
// import { updateTask } from 'services/task/task.service';
// import { taskInfoReducer } from 'containers/task/logic/reducer';

export function* fetchSearch({ partialFilter }: ReturnType<typeof actions.searchFetchData>) {
	try {
		yield put(actions.searchBeforeFetch());
		const data: ISearchState['search'] = yield call(fetchTasksSearch, partialFilter);
		yield put(actions.searchSuccess());
		yield put(actions.searchSetData({ data }));
	} catch (error) {
		yield put(actions.searchError({ payload: error?.errors ?? error?.message ?? 'unknown error' }));
	}
}

export function* fetchSearchNextPage({ partialFilter }: ReturnType<typeof actions.searchFetchData>) {
	try {
		yield put(actions.searchBeforeFetchNextPage());
		const data: ISearchState['search'] = yield call(fetchTasksSearch, partialFilter);
		yield put(actions.searchSuccess());
		yield put(actions.searchAddDataNextPage({ data }));
	} catch (error) {
		yield put(actions.searchError({ payload: error?.errors ?? error?.message ?? 'unknown error' }));
	}
}

export function* fetchUpdateTaskFavoriteStatus({ task }: ReturnType<typeof actions.updateTaskFavoriteStatus>) {
	try {
		// yield put(actions.searchBeforeFetchNextPage());
		// const data: ISearchState['search'] = yield call(fetchTasksSearch, partialFilter);
		// yield put(actions.searchSuccess());
		// yield put(actions.searchAddDataNextPage({ data }));

		debugger;

		yield call(updateTaskFavoriteStatus, { id: task.id, isLiked: true });

		debugger;
	} catch (error) {
		yield put(actions.searchError({ payload: error?.errors ?? error?.message ?? 'unknown error' }));
	}
}

function* watchFetchSearch() {
	yield takeLatest(actionTypes.SEARCH_FETCH, fetchSearch);
}

function* watchFetchNextPage() {
	yield takeLatest(actionTypes.SEARCH_FETCH_NEXT_PAGE, fetchSearchNextPage);
}

function* watchUpdateTask() {
	yield takeLatest(actionTypes.UPDATE_TASK_FAVORITE_STATUS, fetchUpdateTaskFavoriteStatus);
}

export default function* SearchSaga() {
	yield all([watchFetchSearch(), watchFetchNextPage(), watchUpdateTask()]);
}
