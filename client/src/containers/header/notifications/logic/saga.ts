import { all, put, select, takeEvery } from 'redux-saga/effects';
import { IRootState } from 'typings/root-state';
import * as actions from './actions';
import { NotificationsActionTypes } from './action-types';
import { getFirestore, collection, query, getDocs, limit, orderBy } from 'firebase/firestore';
import { app } from 'containers/app/app';
import { NotificationTypes, TNotification } from 'typings/common/INotification';
import { doc, setDoc, where } from 'firebase/firestore';
function* readNotification({ id }: ReturnType<typeof actions.readNotification>) {
	const store: IRootState = yield select();
	const firestore = getFirestore(app);
	const notification = store.header.notifications.get(id);
	const userId = store.auth.userData.user?.id;

	if (notification) {
		yield setDoc(doc(firestore, 'notifications', id), {
			createdAt: notification.date,
			id: notification.id,
			body: notification.body,
			type: notification.type,
			read: true,
			userId,
		});
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
	const store: IRootState = yield select();
	const userId = store.auth.userData.user?.id;
	const q = query(
		collection(firestore, 'notifications'),
		where('userId', '==', userId),
		orderBy('createdAt'),
		limit(10),
	);
	const querySnapshot: TNotification[] = [];
	const result: Record<string, any>[] = yield getDocs(q);
	store.header.notifications.clear();
	result.forEach((notification) => {
		const data = notification.data();
		switch (data.type) {
			case NotificationTypes.Common:
				querySnapshot.push({
					type: data.type,
					id: data.id,
					date: data.createdAt.toDate(),
					read: data.read ?? false,
					body: {
						message: data.body.message,
					},
				});
				break;
			case NotificationTypes.Follower:
				querySnapshot.push({
					type: data.type,
					id: data.id,
					date: data.createdAt.toDate(),
					read: data.read ?? false,
					body: {
						follower: data.body.follower,
					},
				});
				break;
			case NotificationTypes.HonorUnlocks:
				querySnapshot.push({
					type: data.type,
					id: data.id,
					date: data.createdAt.toDate(),
					read: data.read ?? false,
					body: data.body.unlocked,
				});
				break;
			case NotificationTypes.JoinClan:
				querySnapshot.push({
					type: data.type,
					id: data.id,
					date: data.createdAt.toDate(),
					read: data.read ?? false,
					body: { clan: data.body.clan },
				});
				break;
			case NotificationTypes.RankUp:
				querySnapshot.push({
					type: data.type,
					id: data.id,
					date: data.createdAt.toDate(),
					read: data.read ?? false,
					body: { rank: data.body.rank },
				});
				break;
			default:
				break;
		}
	});
	querySnapshot.forEach((item) => {
		store.header.notifications.set(item.id, item);
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
