import { fetchClans, toggleClanMember } from 'services/clans.service';
import { all, put, call, select, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as userActions from '../../../user/logic/actions';
import * as actions from './actions';
import { IRootState } from 'typings/root-state';
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from 'containers/notification/logic/models';
import { addNotification } from 'services/notifications/notifications.service';
import { v4 as uuid } from 'uuid';
import { NotificationTypes } from 'typings/common/INotification';
import { WebApi } from 'typings/webapi';

export function* fetchClansWorker(action: ReturnType<typeof actions.fetchClans>): any {
	yield put(actions.startLoading());

	const options = yield select((state: IRootState) => state.clans.options);
	const response = yield call(fetchClans, options);

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
		yield put(actions.addClans({ clans: response.data, count: response.count }));
	}

	yield put(actions.endLoading());
}

export function* fetchClansWatcher() {
	yield takeEvery(actionTypes.FETCH_CLANS, fetchClansWorker);
}

export function* toggleMemberWorker({ id }: ReturnType<typeof actions.joinClan>): any {
	yield put(actions.startLoading());

	const response = yield call(toggleClanMember, id);

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
		yield put(userActions.setUser({ user: response.user }));
		const type = response.user.clan == null ? NotificationTypes.LeaveClan : NotificationTypes.JoinClan;
		const body = {
			clan: {
				id,
				name: response.clan?.name ?? '',
				avatar:
					response.clan?.avatar ??
					'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg',
			} as WebApi.Entities.IClan,
		};
		addNotification(
			{
				id: uuid(),
				date: new Date(),
				type: type,
				read: false,
				body,
			},
			response.user.id,
		);
		yield put(
			actions.updateClan({
				id: response.clan.id,
				clan: response.clan,
			}),
		);
	}

	yield put(actions.endLoading());
}

export function* toggleMemberWatcher() {
	yield takeEvery(actionTypes.LEAVE_CLAN, toggleMemberWorker);
	yield takeEvery(actionTypes.JOIN_CLAN, toggleMemberWorker);
}

export default function* clansSaga() {
	yield all([fetchClansWatcher(), toggleMemberWatcher()]);
}
