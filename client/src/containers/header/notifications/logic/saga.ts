import { all, put, select, takeEvery } from 'redux-saga/effects';
import { IRootState } from 'typings/root-state';
import * as actions from './actions';
import { NotificationsActionTypes } from './action-types';
import { editNotification } from './actions';

function* readNotification({ id }: ReturnType<typeof actions.readNotification>) {
	const store: IRootState = yield select();
	const notification = store.header.notifications.get(id);
	if (notification) {
		// TODO: socket.io
		yield put(
			editNotification({
				id: notification.id,
				value: { ...notification, read: true },
			}),
		);
	}
}

function* watchReadNotification() {
	yield takeEvery(NotificationsActionTypes.Read, readNotification);
}

export function* NotificationSaga() {
	yield all([watchReadNotification()]);
}
