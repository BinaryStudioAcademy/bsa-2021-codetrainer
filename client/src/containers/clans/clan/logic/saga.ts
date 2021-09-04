import { fetchClan, makeUserLeaveClan, toggleClanMember } from 'services/clans.service';
import { all, put, call, select, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import * as userActions from '../../../user/logic/actions';
import { IRootState } from 'typings/root-state';
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from 'containers/notification/logic/models';
import historyHelper from 'helpers/history.helper';
import { ROUTES } from 'constants/routes';
import { makeUserAdmin } from 'services';

export function* fetchClanWorker({ id }: ReturnType<typeof actions.fetchClan>): any {
	yield put(actions.startLoading());

	const response = yield call(fetchClan, id);

	if (response instanceof Error) {
		yield put(actions.addError({ error: response.message }));
	} else {
		yield put(actions.setClan({ clan: response }));
	}

	yield put(actions.endLoading());
}

export function* fetchClanWatcher() {
	yield takeEvery(actionTypes.FETCH_CLAN, fetchClanWorker);
}

export function* leaveClanWorker(action: ReturnType<typeof actions.leaveClan>): any {
	yield put(actions.startLoading());
	const id = yield select((state: IRootState) => state.clan.data?.id);
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
		historyHelper.push(ROUTES.Clans);
	}
	yield put(actions.endLoading());
}

export function* deleteMemberWorker({ id }: ReturnType<typeof actions.deleteMember>): any {
	yield put(actions.startLoading());

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

	yield put(actions.endLoading());
}

export function* makeAdminWorker({ userId }: ReturnType<typeof actions.makeAdmin>): any {
	yield put(actions.startLoading());

	const responce = yield call(makeUserAdmin, userId);
	if (!responce || responce.affected === 0) {
		yield put(actions.addError({ error: 'Can not make this user an admin' }));
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
	yield put(actions.endLoading());
}

export function* toggleClanWatcher() {
	yield takeEvery(actionTypes.LEAVE_CLAN, leaveClanWorker);
	yield takeEvery(actionTypes.DELETE_MEMBER, deleteMemberWorker);
}

export function* adminWatcher() {
	yield takeEvery(actionTypes.MAKE_ADMIN, makeAdminWorker);
}

export default function* clanSaga() {
	yield all([fetchClanWatcher(), toggleClanWatcher(), adminWatcher()]);
}
