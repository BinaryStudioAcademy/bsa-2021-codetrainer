import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { fetchTaskComments, fetchTasks } from '../../../services/home-page.service';
import { ITask } from '../../../components/common/next-task/interface';
import { getCommunityByUser } from '../../../services/users.service';

export function* fetchTasksWorker(action: ReturnType<typeof actions.getTasks>): any {
	const { discipline, currentTask } = action;
	const tasks = yield call(fetchTasks);
	const filteredTasks = tasks.filter(
		(item: ITask) => item.discipline?.toLowerCase() === discipline.toLowerCase() && item.id !== currentTask,
	);
	yield put(actions.setTask({ task: filteredTasks[Math.floor(Math.random() * filteredTasks.length)] }));
}

export function* fetchTaskWatcher() {
	yield takeEvery(actionTypes.GET_TASKS, fetchTasksWorker);
}

export function* fetchMessagesWorker(action: ReturnType<typeof actions.getMessages>): any {
	const messages = yield call(fetchTaskComments);
	yield put(actions.setMessages({ messages }));
}

export function* fetchMessagesWatcher() {
	yield takeEvery(actionTypes.GET_MESSAGES, fetchMessagesWorker);
}

export function* fetchCommunityWorker(action: ReturnType<typeof actions.getCommunity>): any {
	const { id } = action;
	const community = yield call(() => getCommunityByUser(id));
	yield put(actions.setCommunity({ community }));
}

export function* fetchCommunityWatcher() {
	yield takeEvery(actionTypes.GET_COMMUNITY, fetchCommunityWorker);
}

export default function* homeSaga() {
	yield all([fetchTaskWatcher(), fetchMessagesWatcher(), fetchCommunityWatcher()]);
}
