import { fetchUserLeaders } from 'services/users.service';
import { all, put, call, select, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { IRootState } from 'typings/root-state';
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from 'containers/notification/logic/models';

export function* fetchUsersWorker(action: ReturnType<typeof actions.fetchUsers>): any {
	yield put(actions.startLoading());

	const options = yield select((state: IRootState) => state.leaderBoard.options);
	const response = yield call(fetchUserLeaders, options);

	if (response instanceof Error) {
		yield put(actions.addError({ error: response.message }));
		yield put(
			setNotificationState({
				state: {
					notificationType: NotificationType.Error,
					message: response.message,
				},
			}),
		);
	} else {
		yield put(actions.addUsers({ users: response.data, count: response.count }));
	}

	yield put(actions.endLoading());
}

export function* fetchUsersWatcher() {
	yield takeEvery(actionTypes.FETCH_USERS, fetchUsersWorker);
}

export default function* leaderBoardSaga() {
	yield all([fetchUsersWatcher()]);
}
