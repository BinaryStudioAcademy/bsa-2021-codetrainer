import { getUserById, makeUserAdmin } from './../../../../services/users.service';
import { mapUserResponseToUser } from 'helpers/user.helper';
import { ROUTES } from 'constants/routes';
import historyHelper from 'helpers/history.helper';
import { ClanPageStatus } from './types';
import { getCommunityByUserId } from 'services/follower/followers.service';
import { fetchClan, toggleClanMember, updateClan, deleteClan, makeUserLeaveClan } from 'services/clans.service';
import { createClan } from 'services/create-clan.service';
import { all, put, call, select, takeLatest, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import * as userActions from 'containers/user/logic/actions';
import { IRootState } from 'typings/root-state';
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from 'containers/notification/logic/models';
import { addNotification } from 'services/notifications/notifications.service';
import { v4 as uuid } from 'uuid';
import { NotificationTypes } from 'typings/common/INotification';
import { WebApi } from 'typings/webapi';

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
		const fetchedUsers = yield all(response.map((user: { id: string }) => call(getUserById, user.id)));
		const users = fetchedUsers.map((item: { user: any }) => item.user);
		yield put(actions.setCommunity({ community: users }));
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
			//left clan
			addNotification(
				{
					id: uuid(),
					date: new Date(),
					type: NotificationTypes.LeaveClan,
					body: {
						clan: {
							id: response.clan.id ?? '',
							name: response.clan.name ?? '',
							avatar:
								response.clan.avatar ??
								'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg',
						} as WebApi.Entities.IClan,
					},
					read: false,
				},
				user.id,
			);
			historyHelper.push(ROUTES.Clans);
		} else {
			addNotification(
				{
					id: uuid(),
					date: new Date(),
					type: NotificationTypes.JoinClan,
					body: {
						clan: {
							id: response.clan.id ?? '',
							name: response.clan.name ?? '',
							avatar:
								response.clan.avatar ??
								'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg',
						} as WebApi.Entities.IClan,
					},
					read: false,
				},
				user.id,
			);
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

export function* makeAdminWorker({ userId }: ReturnType<typeof actions.makeAdmin>): any {
	yield put(actions.loadingStatus());

	const responce = yield call(makeUserAdmin, userId);
	if (!responce || responce.affected === 0) {
		yield put(
			setNotificationState({
				state: {
					notificationType: NotificationType.Error,
					message: 'Can not make this user an admin',
				},
			}),
		);
	}
	const clanId = yield select((state: IRootState) => state.clan.data?.id);
	yield put(actions.clearClan());
	const clan = yield call(fetchClan, clanId);
	yield put(
		actions.setClan({
			clan: {
				...clan,
				createdAt: new Date(clan.createdAt),
			},
		}),
	);
	yield put(actions.successStatus());
}

export function* deleteMemberWorker({ id }: ReturnType<typeof actions.deleteMember>): any {
	yield put(actions.loadingStatus());

	const { clan } = yield call(makeUserLeaveClan, id);
	yield put(actions.clearClan());

	yield put(
		actions.setClan({
			clan: {
				...clan,
				createdAt: new Date(clan.createdAt),
			},
		}),
	);

	yield put(actions.successStatus());
}

function* deleteMemberWatcher() {
	yield takeEvery(actionTypes.DELETE_MEMBER, deleteMemberWorker);
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

function* addAdminWatcher() {
	yield takeEvery(actionTypes.MAKE_ADMIN, makeAdminWorker);
}

export default function* clanSaga() {
	yield all([
		fetchClanWatcher(),
		fetchCommunityWatcher(),
		createClanWatcher(),
		toggleClanWatcher(),
		updateClanWatcher(),
		deleteClanWatcher(),
		addAdminWatcher(),
		deleteMemberWatcher(),
	]);
}
