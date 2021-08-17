import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { fetchTasks } from '../../../services/home-page.service';
import { ITask } from '../../../components/common/next-task/interface';

export function* fetchTasksWorker(action: ReturnType<typeof actions.getTasks>): any {
	const {discipline, currentTask} = action;
	const tasks = yield call(fetchTasks);
	const filteredTasks = tasks.filter((item: ITask) => item.discipline === discipline && item.id !== currentTask);
	yield put(actions.setTask({ task: filteredTasks[Math.floor(Math.random()*filteredTasks.length)] }));
}

export function* fetchTaskWatcher() {
	yield takeEvery(actionTypes.GET_TASKS, fetchTasksWorker);
}

export default function* homeSaga() {
	yield all([fetchTaskWatcher()]);
}


