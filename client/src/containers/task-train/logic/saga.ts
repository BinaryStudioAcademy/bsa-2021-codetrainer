import { all, put, call, takeLatest, select } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { fetchTask } from 'services/tasks.service';
import { fetchUserSolution, submitSolution, editSolution } from 'services/solutions.service';

export function* fetchTaskWorker({ id }: ReturnType<typeof actions.fetchTask>): any {
	yield put(actions.startLoading());

	const response = yield call(fetchTask, id);

	if (response instanceof Error) {
	} else {
		yield put(actions.setTask({ task: response }));
	}

	yield put(actions.endLoading());
}

export function* fetchTaskWatcher() {
	yield takeLatest(actionTypes.FETCH_TASK, fetchTaskWorker);
}

export function* fetchSolutionWorker({ taskId }: ReturnType<typeof actions.fetchTask>): any {
	yield put(actions.startLoading());

	const response = yield call(fetchUserSolution, taskId);

	if (response instanceof Error) {
	} else {
		yield put(actions.setSolution({ solution: response }));
	}

	yield put(actions.endLoading());
}

export function* fetchSolutionWatcher() {
	yield takeLatest(actionTypes.FETCH_SOLUTION, fetchSolutionWorker);
}

export function* submitSolutionWorker(solution: ReturnType<typeof actions.submitSolution>): any {
	yield put(actions.startLoading());

	const existingSolution = yield select((state) => state.task.solution);

	let response;

	if (existingSolution) {
		response = yield call(editSolution, { solutionId: existingSolution.id, ...solution });
	} else {
		response = yield call(submitSolution, solution);
	}

	if (response instanceof Error) {
	} else {
		yield put(actions.setSolution({ solution: response }));
	}

	yield put(actions.endLoading());
}

export function* submitSolutionWatcher() {
	yield takeLatest(actionTypes.SUBMIT_SOLUTION, submitSolutionWorker);
}

export default function* taskTrainSaga() {
	yield all([fetchTaskWatcher(), fetchSolutionWatcher(), submitSolutionWatcher()]);
}
