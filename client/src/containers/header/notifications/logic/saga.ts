import { all, put, select, takeEvery } from 'redux-saga/effects';
import { IRootState } from 'typings/root-state';
import * as actions from './actions';
import { NotificationsActionTypes } from './action-types';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { app } from 'containers/app/app';
import { NotificationTypes, TNotification } from 'typings/common/INotification';
import { v4 as uuid } from 'uuid';

function* readNotification({ id }: ReturnType<typeof actions.readNotification>) {
	const store: IRootState = yield select();
	const notification = store.header.notifications.get(id);
	if (notification) {
		// TODO: socket.io
		yield put(
			actions.editNotification({
				id: notification.id,
				value: { ...notification, read: true },
			}),
		);
	}
}

function* fetchNotification() {
	const firestore = getFirestore(app);
	const q = query(collection(firestore, 'notifications'));
	const querySnapshot: TNotification[] = [];
	const result: Record<string, any>[] = yield getDocs(q);
	result.forEach((notification) => {
		const data = notification.data();
		switch (data.type) {
			case NotificationTypes.Common:
				querySnapshot.push({
					type: data.type,
					id: uuid(),
					date: data.createdAt,
					read: false,
					body: {
						message: data.message,
					},
				});
				break;
		}
	});
	try {
		yield put(
			actions.setNotifications({
				notifications: querySnapshot,
			}),
		);
	} catch (e) {
		console.log(e);
	}
}

function* watchReadNotification() {
	yield takeEvery(NotificationsActionTypes.Read, readNotification);
}

function* watchFetchNotification() {
	yield takeEvery(NotificationsActionTypes.Fetch, fetchNotification);
}

export function* NotificationSaga() {
	yield all([watchReadNotification(), watchFetchNotification()]);
}
