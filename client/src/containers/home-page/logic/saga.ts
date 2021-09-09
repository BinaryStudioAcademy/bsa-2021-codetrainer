import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { fetchFocusTask, fetchTaskComments, fetchTasks } from '../../../services/home-page.service';
import { ITask } from '../../../components/common/next-task/interface';
import { fetchCommunity } from '../../../services/followers.service';
import { WebApi } from 'typings/webapi';
import { IMessage } from '../types';

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

export function* fetchFocusTasksWorker({ discipline }: ReturnType<typeof actions.getFocusTask>) {
	try {
		const { nextTask }: { nextTask: WebApi.Entities.ITask | null } = yield call(fetchFocusTask, discipline);
		yield put(actions.setTask({ task: nextTask }));
	} catch (error) {
		yield put(actions.setErrors({ errors: (error as Error)?.message ?? 'unknown error' }));
	}
}

export function* fetchFocusTaskWatcher() {
	yield takeEvery(actionTypes.GET_FOCUS_TASK, fetchFocusTasksWorker);
}

export function* fetchMessagesWorker({ skip, take, isLoadPage }: ReturnType<typeof actions.getMessages>): any {
	if (isLoadPage) {
		yield put(actions.setDataBeforeLoad());
	}
	const { comment, count }: { comment: IMessage[]; count: number } = yield call(fetchTaskComments, { skip, take });
	yield put(actions.setMessages({ messages: comment, messagesCount: count }));
}

export function* fetchMessagesWatcher() {
	yield takeEvery(actionTypes.GET_MESSAGES, fetchMessagesWorker);
}

export function* fetchCommunityWorker(action: ReturnType<typeof actions.getCommunity>): any {
	const { id } = action;
	const { community } = yield call(() => fetchCommunity(id));
	yield put(actions.setCommunity({ community }));
}

export function* fetchCommunityWatcher() {
	yield takeEvery(actionTypes.GET_COMMUNITY, fetchCommunityWorker);
}

export default function* homeSaga() {
	yield all([fetchTaskWatcher(), fetchMessagesWatcher(), fetchCommunityWatcher(), fetchFocusTaskWatcher()]);
}
