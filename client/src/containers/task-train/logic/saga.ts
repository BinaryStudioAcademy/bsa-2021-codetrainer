import { all, put, call, takeLatest, select } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { fetchTask } from 'services/tasks.service';
import { fetchUserSolution, submitSolution, editSolution, patchSolution } from 'services/solutions.service';
import { getTask, TypeGetTask } from './selectors';
import { WebApi } from 'typings/webapi';

export function* fetchTaskWorker({ id }: ReturnType<typeof actions.fetchTask>): any {
	yield put(actions.startLoading());

	const task = yield call(fetchTask, id);
	const solution = yield call(fetchUserSolution, id);

	if (task instanceof Error || solution instanceof Error) {
		yield put(actions.setErrors({ errors: task?.message || solution?.message || 'unknown error' }));
	} else {
		yield put(actions.setTask({ task }));
		yield put(actions.setSolution({ solution }));
	}

	yield put(actions.endLoading());
}

export function* fetchTaskWatcher() {
	yield takeLatest(actionTypes.FETCH_TASK, fetchTaskWorker);
}

export function* submitSolutionWorker(data: ReturnType<typeof actions.submitSolution>): any {
	yield put(actions.startLoading());

	const { solution }: TypeGetTask = yield select(getTask);

	let response;
	if (solution) {
		response = yield call(
			{ context: editSolution, fn: editSolution },
			{ solutionId: solution.id, ...solution, ...data },
		);
	} else {
		response = yield call({ context: submitSolution, fn: submitSolution }, data);
	}

	if (response instanceof Error) {
		yield put(actions.setErrors({ errors: response?.message || 'unknown error' }));
	} else {
		yield put(actions.setSolution({ solution: response }));
	}
}

export function* patchSolutionWorker(data: ReturnType<typeof actions.patchSolution>) {
	yield put(actions.startLoading());
	const { solution, task }: TypeGetTask = yield select(getTask);

	const response: WebApi.Entities.ISolution | Error = yield call(patchSolution, {
		...data,
		solutionId: solution?.id,
		taskId: task?.id,
	});

	if (response instanceof Error) {
		yield put(actions.setErrors({ errors: response?.message || 'unknown error' }));
	} else {
		yield put(actions.setSolution({ solution: response }));
	}
	yield put(actions.endLoading());
}

export function* submitSolutionWatcher() {
	yield takeLatest(actionTypes.SUBMIT_SOLUTION, submitSolutionWorker);
}

export function* resetSolutionWatcher() {
	yield takeLatest(actionTypes.PATCH_SOLUTION, patchSolutionWorker);
}

export default function* taskTrainSaga() {
	yield all([fetchTaskWatcher(), submitSolutionWatcher(), resetSolutionWatcher()]);
}
