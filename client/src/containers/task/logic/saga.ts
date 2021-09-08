import { all, put, takeEvery, call, select } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { getTaskById } from 'services/task/task.service';
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from 'containers/notification/logic/models';
import { fetchTasks } from 'services/home-page.service';
import { WebApi } from 'typings/webapi';
import { fetchFollowing } from 'services/followers.service';
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

export function* fetchNextTaskWorker(action: ReturnType<typeof actions.getNextTask>): any {
	try {
		const { id } = action;
		const tasks = yield call(fetchTasks);
		const filteredTasks = tasks.filter((item: WebApi.Entities.IChallenge) => item.id !== id);
		yield put(
			actions.setNextTask({ nextTaskId: filteredTasks[Math.floor(Math.random() * filteredTasks.length)].id }),
		);
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
		fetchCommentsWatcher(),
		postCommentWatcher(),
		editCommentWatcher(),
		deleteCommentWatcher(),
	]);
}
