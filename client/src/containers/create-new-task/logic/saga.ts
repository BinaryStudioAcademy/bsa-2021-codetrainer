import { all, put, takeEvery, call, select } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { loadTasks, updateTask, createTask, validateTask, deleteTask, publishTask } from 'services/task';
import { WebApi } from 'typings/webapi';
import { TypeGetTask, getTask } from './selectors';
import { taskInitialState } from './state';

function* fetchTasks() {
	yield put(actions.loading({ isLoading: true }));
	try {
		const tasks: WebApi.Entities.ITask[] = yield call(loadTasks);
		yield put(actions.setTasks({ tasks }));
		yield put(actions.setTask({ task: taskInitialState }));
		yield put(actions.setTestResult({ testResult: null }));
	} catch (error) {
		yield put(actions.errors({ errors: (error as Error).message ?? 'unknown error' }));
	}
	yield put(actions.loading({ isLoading: false }));
}

function* watchLoadTasks() {
	yield takeEvery(actionTypes.LOAD_TASKS, fetchTasks);
}

function* saveTask(action: ReturnType<typeof actions.saveTask>) {
	const { id } = action.task;
	yield put(actions.loading({ isLoading: true }));
	try {
		let task!: WebApi.Entities.ITask;
		if (id && Boolean(id.length)) {
			task = yield call({ context: updateTask, fn: updateTask }, action.task, id);
		} else {
			task = yield call(createTask, action.task);
		}
		yield put(actions.addTask({ task }));
		yield put(actions.setTask({ task }));
		yield put(actions.success({ success: 'Save is Success' }));
	} catch (error) {
		yield put(actions.errors({ errors: (error as Error).message ?? 'unknown error' }));
	}
	yield put(actions.loading({ isLoading: false }));
}

function* watchSaveTask() {
	yield takeEvery(actionTypes.SAVE_TASK, saveTask);
}

function* taskValidation(action: ReturnType<typeof actions.taskValidation>) {
	const {
		task: { id },
	}: TypeGetTask = yield select(getTask);
	if (!id || !Boolean(id?.length)) {
		return;
	}
	yield put(actions.loading({ isLoading: true }));
	try {
		yield call({ context: validateTask, fn: validateTask }, action.typeTest, id);
	} catch (error) {
		yield put(actions.errors({ errors: (error as Error).message ?? 'unknown error' }));
		yield put(actions.loading({ isLoading: false }));
	}
}

function* watchTaskValidation() {
	yield takeEvery(actionTypes.TASK_VALIDATION, taskValidation);
}

function* deleteTaskSaga() {
	const {
		task: { id },
	}: TypeGetTask = yield select(getTask);
	if (!id || !Boolean(id?.length)) {
		return;
	}
	yield put(actions.loading({ isLoading: true }));
	try {
		yield call(deleteTask, id);
		yield put(actions.deleteTask({ taskId: id }));
		yield put(actions.setTask({ task: taskInitialState }));
		yield put(actions.success({ success: 'Delete is Success' }));
	} catch (error) {
		yield put(actions.errors({ errors: (error as Error).message ?? 'unknown error' }));
	}
	yield put(actions.loading({ isLoading: false }));
}

function* watchDeleteTask() {
	yield takeEvery(actionTypes.FETCH_DELETE_TASK, deleteTaskSaga);
}

function* publishTaskSaga() {
	const {
		task: { id },
	}: TypeGetTask = yield select(getTask);
	if (!id || !Boolean(id?.length)) {
		return;
	}
	yield put(actions.loading({ isLoading: true }));
	try {
		const task: WebApi.Entities.ITask = yield call(publishTask, id);
		yield put(actions.setTask({ task }));
		yield put(actions.success({ success: 'You task is published' }));
	} catch (error) {
		yield put(actions.errors({ errors: (error as Error).message ?? 'unknown error' }));
	}
	yield put(actions.loading({ isLoading: false }));
}

function* watchPublishTaskSaga() {
	yield takeEvery(actionTypes.PUBLISH_TASK, publishTaskSaga);
}

export default function* CreateTaskSage() {
	yield all([watchLoadTasks(), watchSaveTask(), watchTaskValidation(), watchDeleteTask(), watchPublishTaskSaga()]);
}
