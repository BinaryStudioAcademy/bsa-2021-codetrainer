import { mapUserResponseToUser } from 'helpers/user.helper';
import { ClanPageStatus } from './types';
import { getCommunityByUserId } from 'services/follower/followers.service';
import { WebApi } from 'typings/webapi';
import { fetchClan, toggleClanMember, updateClan } from 'services/clans.service';
import { all, put, call, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import * as userActions from '../../../user/logic/actions';
import { IRootState } from 'typings/root-state';
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from 'containers/notification/logic/models';

export function* fetchClanWorker({ id }: ReturnType<typeof actions.fetchClan>): any {
	yield put(actions.loadingStatus());
	yield put(actions.clearClan());
	yield put(actions.clearError());

	const response = yield call(fetchClan, id);

	if (response instanceof Error) {
		yield put(actions.setError({ error: response.message }));
		yield put(actions.errorStatus());
	} else {
		yield put(actions.setClan({ clan: response }));
		yield put(actions.successStatus());
	}
}

export function* fetchCommunityWorker(action: ReturnType<typeof actions.fetchCommunity>): any {
	try {
		yield put(actions.setInvitationStatus({ status: ClanPageStatus.LOADING }));
		yield put(actions.setCommunity({ community: [] }));
		const response = yield call(getCommunityByUserId, action.userId);
		yield put(actions.setCommunity({ community: response }));
	} catch (error) {
		if (error instanceof Error) {
			yield put(
				setNotificationState({
					state: {
						notificationType: NotificationType.Error,
						message: error.message,
					},
				})
			);
		}
	} finally {
		yield put(actions.setInvitationStatus({ status: ClanPageStatus.SUCCESS }));
	}
}

export function* toggleClanWorker(action: ReturnType<typeof actions.toggleClanMember>): any {
	yield put(actions.loadingStatus());

	const id = yield select((state: IRootState) => state.clan.data?.id);
	const response = yield call(toggleClanMember, id);

	if (response instanceof Error) {
		yield put(
			setNotificationState({
				state: {
					notificationType: NotificationType.Error,
					message: response.message,
				},
			}),
		);
	} else {
		const user = yield call(mapUserResponseToUser, response.user);
		yield put(actions.setClan({ clan: response.clan }));
		yield put(userActions.setUser({ user }));
		yield put(actions.successStatus());
	}
}

export function* updateClanWorker({ id, form }: ReturnType<typeof actions.updateClan>): any {
	const clan = {
		...form,
		avatar: form.avatar || null,
		cover: form.cover || null,
		type: undefined,
		isPublic: form.type === 'public',
	} as unknown as WebApi.Entities.IClan;
	try {
		yield put(actions.setEditStatus({ status: ClanPageStatus.LOADING }));
		const newClan = yield call(updateClan, id, clan);
		yield put(actions.setClan({ clan: newClan }));
		yield put(
			setNotificationState({
				state: {
					notificationType: NotificationType.Success,
					message: 'Successfully updated',
				},
			})
		);
	} catch (error) {
		if (error instanceof Error) {
			yield put(
				setNotificationState({
					state: {
						notificationType: NotificationType.Error,
						message: error.message,
					},
				})
			);
		}
	} finally {
		yield put(actions.setEditStatus({ status: ClanPageStatus.SUCCESS }));
	}
}

function* fetchClanWatcher() {
	yield takeLatest(actionTypes.FETCH_CLAN, fetchClanWorker);
}

function* fetchCommunityWatcher() {
	yield takeLatest(actionTypes.FETCH_COMMUNITY, fetchCommunityWorker);
}

function* toggleClanWatcher() {
	yield takeLatest(actionTypes.TOGGLE_CLAN_MEMBER, toggleClanWorker);
}

function* updateClanWatcher() {
	yield takeLatest(actionTypes.UPDATE_CLAN, updateClanWorker);
}

export default function* clanSaga() {
	yield all([fetchClanWatcher(), fetchCommunityWatcher(), toggleClanWatcher(), updateClanWatcher()]);
}
