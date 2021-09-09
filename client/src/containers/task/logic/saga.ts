import { all, put, takeEvery, call, select } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { getTaskById } from 'services/task/task.service';
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from 'containers/notification/logic/models';
import { WebApi } from 'typings/webapi';
import { fetchFollowing } from 'services/followers.service';
import { fetchUserSolution, patchSolution, submitSolution } from 'services/solutions.service';
import { fetchNextTask, fetchSimilarTasks, fetchStats } from 'services/tasks.service';
import { fetchComments, postComment, deleteComment, editComment } from 'services/comment-task.service';

export function* fetchTaskWorker(action: ReturnType<typeof actions.getTask>): any {
	try {
		const { id } = action;
		const task = yield call(getTaskById, id);
		console.log(task);

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
		const { id } = action;
		const tasks = yield call(() => fetchSimilarTasks(id));

		yield put(actions.setTasks({ similarTasks: tasks }));
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

export function* fetchCommentsWorker(action: ReturnType<typeof actions.getComments>): any {
	try {
		yield put(actions.incrementCommentsPage());

		const options = yield select((state) => state.taskInfo.comments.options);
		const taskId = yield select((state) => state.taskInfo.task.id);
		const comments = yield call(fetchComments, { taskId, ...options });

		yield put(actions.setComments({ comments }));
	} catch (error) {}
}

export function* fetchCommentsWatcher() {
	yield takeEvery(actionTypes.GET_COMMENTS, fetchCommentsWorker);
}

export function* postCommentWorker({ body }: ReturnType<typeof actions.postComment>): any {
	try {
		const taskId = yield select((state) => state.taskInfo.task.id);
		const comment = yield call(postComment, taskId, body);

		yield put(actions.addComments({ comments: [comment], before: true }));
	} catch (error) {}
}

export function* postCommentWatcher() {
	yield takeEvery(actionTypes.POST_COMMENT, postCommentWorker);
}

export function* editCommentWorker({ id, body }: ReturnType<typeof actions.editComment>): any {
	try {
		const editedComment = yield call(editComment, id, body);

		const comments: Array<WebApi.Entities.ICommentTask> = yield select((state) => state.taskInfo.comments.items) ||
			[];
		const updatedComments = comments.map((comment) => (comment.id === id ? editedComment : comment));

		yield put(actions.setComments({ comments: updatedComments }));
	} catch (error) {}
}

export function* editCommentWatcher() {
	yield takeEvery(actionTypes.EDIT_COMMENT, editCommentWorker);
}

export function* deleteCommentWorker({ id }: ReturnType<typeof actions.deleteComment>): any {
	try {
		yield call(deleteComment, id);

		const comments: Array<WebApi.Entities.ICommentTask> = yield select((state) => state.taskInfo.comments.items) ||
			[];
		const updatedComments = comments.filter((comment) => comment.id !== id);

		yield put(actions.setComments({ comments: updatedComments }));
	} catch (error) {}
}

export function* deleteCommentWatcher() {
	yield takeEvery(actionTypes.DELETE_COMMENT, deleteCommentWorker);
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
		fetchCommentsWatcher(),
		postCommentWatcher(),
		editCommentWatcher(),
		deleteCommentWatcher(),
	]);
}
