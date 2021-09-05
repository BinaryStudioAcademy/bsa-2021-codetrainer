import { mapUserResponseToUser } from 'helpers/user.helper';
import { ROUTES } from 'constants/routes';
import historyHelper from 'helpers/history.helper';
import { ClanPageStatus } from './types';
import { getCommunityByUserId } from 'services/follower/followers.service';
import { fetchClan, toggleClanMember, updateClan, deleteClan } from 'services/clans.service';
import { createClan } from 'services/create-clan.service';
import { all, put, call, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import * as userActions from 'containers/user/logic/actions';
import { IRootState } from 'typings/root-state';
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from 'containers/notification/logic/models';

export function* fetchClanWorker({ id }: ReturnType<typeof actions.fetchClan>): any {
	yield put(actions.loadingStatus());
	yield put(actions.clearClan());
	yield put(actions.clearError());

	const response = yield call(fetchClan, id);

	if (response instanceof Error) {
		yield put(actions.setError({ error: 'Clan not found' }));
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
				}),
			);
		}
	} finally {
		yield put(actions.setInvitationStatus({ status: ClanPageStatus.SUCCESS }));
	}
}

export function* createClanWorker({ form }: ReturnType<typeof actions.createClan>): any {
	try {
		yield put(actions.setEditStatus({ status: ClanPageStatus.LOADING }));
		const response = yield call(createClan, form);
		yield put(userActions.setUser({ user: response.user }));
		yield put(
			setNotificationState({
				state: {
					notificationType: NotificationType.Success,
					message: 'Successfully created',
				},
			}),
		);
		historyHelper.push(`${ROUTES.Clan}/${response.clan.id}`);
	} catch (error) {
		if (error instanceof Error) {
			yield put(
				setNotificationState({
					state: {
						notificationType: NotificationType.Error,
						message: error.message,
					},
				}),
			);
		}
	} finally {
		yield put(actions.setEditStatus({ status: ClanPageStatus.SUCCESS }));
	}
}

export function* toggleClanWorker(_action: ReturnType<typeof actions.toggleClanMember>): any {
	yield put(actions.loadingStatus());

	const hasClan = yield select((state: IRootState) => Boolean(state.auth.userData.user?.clan));
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
		if (hasClan) {
			historyHelper.push(ROUTES.Clans);
		}
	}

	yield put(actions.successStatus());
}

export function* updateClanWorker({ id, form }: ReturnType<typeof actions.updateClan>): any {
	try {
		yield put(actions.setEditStatus({ status: ClanPageStatus.LOADING }));
		const clan = yield call(updateClan, id, form);
		yield put(actions.setClan({ clan }));
		yield put(userActions.setUserClan({ clan }));
		yield put(
			setNotificationState({
				state: {
					notificationType: NotificationType.Success,
					message: 'Successfully updated',
				},
			}),
		);
	} catch (error) {
		if (error instanceof Error) {
			yield put(
				setNotificationState({
					state: {
						notificationType: NotificationType.Error,
						message: error.message,
					},
				}),
			);
		}
	} finally {
		yield put(actions.setEditStatus({ status: ClanPageStatus.SUCCESS }));
	}
}

export function* deleteClanWorker(): any {
	yield put(actions.loadingStatus());

	try {
		yield call(deleteClan);
		yield put(actions.clearClan());
		yield put(userActions.setUserClan({ clan: null }));
		historyHelper.push(ROUTES.Clans);
	} catch (error) {
		if (error instanceof Error) {
			yield put(
				setNotificationState({
					state: {
						notificationType: NotificationType.Error,
						message: error.message,
					},
				}),
			);
		}
	} finally {
		yield put(actions.successStatus());
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

function* createClanWatcher() {
	yield takeLatest(actionTypes.CREATE_CLAN, createClanWorker);
}

function* updateClanWatcher() {
	yield takeLatest(actionTypes.UPDATE_CLAN, updateClanWorker);
}

function* deleteClanWatcher() {
	yield takeLatest(actionTypes.DELETE_CLAN, deleteClanWorker);
}

export default function* clanSaga() {
	yield all([
		fetchClanWatcher(),
		fetchCommunityWatcher(),
		createClanWatcher(),
		toggleClanWatcher(),
		updateClanWatcher(),
		deleteClanWatcher(),
	]);
}
