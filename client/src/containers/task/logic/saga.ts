import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { getTaskById } from 'services/task/task.service';
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from 'containers/notification/logic/models';
import { fetchTasks } from 'services/home-page.service';
import { WebApi } from 'typings/webapi';
import { fetchFollowing } from 'services/followers.service';
import { fetchUserSolution, patchSolution, submitSolution } from 'services/solutions.service';
import { fetchNextTask, fetchStats } from 'services/tasks.service';

export function* fetchTaskWorker(action: ReturnType<typeof actions.getTask>): any {
	try {
		const { id } = action;
		const task = yield call(getTaskById, id);
		yield put(actions.setTask({ task }));
	} catch (error) {
		yield put(
			setNotificationState({
				state: { notificationType: NotificationType.Error, message: 'Challenge not found' },
			}),
		);
		yield put(actions.setNotFound({ notFound: true }));
	}
}

export function* fetchTaskWatcher() {
	yield takeEvery(actionTypes.GET_TASK, fetchTaskWorker);
}

export function* fetchTasksWorker(action: ReturnType<typeof actions.getTask>): any {
	try {
		const { rank, id } = action;
		const tasks = yield call(fetchTasks);
		const filteredTasks = tasks
			.filter((item: WebApi.Entities.IChallenge) => item.rank === rank && item.id !== id)
			.sort(() => 0.5 - Math.random())
			.slice(0, 2);

		yield put(actions.setTasks({ similarTasks: filteredTasks }));
	} catch (error) {
		yield put(
			setNotificationState({
				state: { notificationType: NotificationType.Error, message: 'Similar challenges not found' },
			}),
		);
	}
}

export function* fetchTasksWatcher() {
	yield takeEvery(actionTypes.GET_TASKS, fetchTasksWorker);
}

export function* skipTaskWorker(action: ReturnType<typeof actions.skipTask>): any {
	if (action.solutionId) {
		yield call(() => patchSolution(action));
	} else {
		const solution = yield call({ context: submitSolution, fn: submitSolution }, action);
		yield call(() =>
			patchSolution({
				...action,
				solutionId: solution.id,
			}),
		);
	}
}

export function* skipTaskWatcher() {
	yield takeEvery(actionTypes.SKIP_TASK, skipTaskWorker);
}

export function* fetchNextTaskWorker(action: ReturnType<typeof actions.getNextTask>): any {
	try {
		const { nextTask } = yield call(fetchNextTask);
		yield put(actions.setNextTask({ nextTaskId: nextTask.id }));
	} catch (error) {
		yield put(
			setNotificationState({
				state: { notificationType: NotificationType.Error, message: "You can't skip this task" },
			}),
		);
	}
}

export function* fetchNextTaskWatcher() {
	yield takeEvery(actionTypes.GET_NEXT_TASK, fetchNextTaskWorker);
}

export function* fetchFollowingWorker(action: ReturnType<typeof actions.getFollowing>): any {
	try {
		const { id } = action;
		if (id) {
			const following = yield call(() => fetchFollowing(id));
			const result = [];
			for (const user of following) {
				result.push(user.following);
			}

			yield put(actions.setFollowing({ following: result }));
		}
	} catch (error) {
		setNotificationState({
			state: {
				notificationType: NotificationType.Error,
				message: 'Something went wrong',
			},
		});
	}
}

export function* fetchFollowingWatcher() {
	yield takeEvery(actionTypes.GET_FOLLOWING, fetchFollowingWorker);
}

export function* fetchUserSolutionWorker(action: ReturnType<typeof actions.getUserSolution>): any {
	try {
		yield put(actions.setIsLoading({ isLoading: true }));
		const { taskId } = action;
		if (taskId) {
			const userSolution = yield call(() => fetchUserSolution(taskId));
			console.log(userSolution);
			yield put(actions.setUserSolution(userSolution));
		}
		yield put(actions.setIsLoading({ isLoading: false }));
	} catch (error) {
		setNotificationState({
			state: {
				notificationType: NotificationType.Error,
				message: "Cannot find user's solution",
			},
		});
	}
}

export function* fetchUserSolutionWatcher() {
	yield takeEvery(actionTypes.GET_USER_SOLUTION, fetchUserSolutionWorker);
}

export function* unlockSolutionWorker(action: ReturnType<typeof actions.unlockSolution>): any {
	try {
		console.log('unlock solution worker');
		if (!action.solutionId) {
			const solution = yield call({ context: submitSolution, fn: submitSolution }, action);
			yield call(() =>
				patchSolution({
					...action,
					solutionId: solution.id,
				}),
			);
		} else {
			yield call(() => patchSolution(action));
		}
		yield put(actions.getUserSolution({ taskId: action.taskId }));
	} catch (error) {
		setNotificationState({
			state: {
				notificationType: NotificationType.Error,
				message: 'Cannot unlock solution',
			},
		});
	}
}

export function* unlockSolutionWatcher() {
	yield takeEvery(actionTypes.UNLOCK_SOLUTION, unlockSolutionWorker);
}

export function* fetchStatsWorker(action: ReturnType<typeof actions.getStats>): any {
	try {
		const { id } = action;
		if (id) {
			const { stats } = yield call(() => fetchStats(id));
			yield put(actions.setStats({ stats }));
		}
	} catch (error) {
		setNotificationState({
			state: {
				notificationType: NotificationType.Error,
				message: 'Cannot get task stats',
			},
		});
	}
}

export function* fetchStatsWatcher() {
	yield takeEvery(actionTypes.GET_STATS, fetchStatsWorker);
}

export default function* taskInfoSaga() {
	yield all([
		fetchTaskWatcher(),
		fetchTasksWatcher(),
		fetchNextTaskWatcher(),
		fetchFollowingWatcher(),
		fetchUserSolutionWatcher(),
		unlockSolutionWatcher(),
		fetchStatsWatcher(),
		skipTaskWatcher(),
	]);
}
