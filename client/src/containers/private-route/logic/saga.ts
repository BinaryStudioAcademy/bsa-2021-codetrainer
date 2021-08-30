import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { fetchTasks } from '../../../services/home-page.service';

export function* fetchTasksWorker(action: ReturnType<typeof actions.getTasks>): any {
	const tasks = yield call(fetchTasks);
	yield put(actions.setTask({ taskId: tasks[Math.floor(Math.random() * tasks.length)].id }));
}

export function* fetchTaskWatcher() {
	yield takeEvery(actionTypes.GET_TASKS, fetchTasksWorker);
}

export default function* sidebarSaga() {
	yield all([fetchTaskWatcher()]);
}
