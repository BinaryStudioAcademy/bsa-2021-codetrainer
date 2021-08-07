import { fetchClan, leaveClan } from 'services/clans.service';
import { all, put, call, select, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { IRootState } from 'typings/root-state';

export function* fetchClanWorker(action: ReturnType<typeof actions.fetchClan>): any {
	const clanId = action.id;
	const clan = yield call(fetchClan, clanId);
	yield put(actions.setClan({ clan }));
}

export function* fetchClanWatcher() {
	yield takeEvery(actionTypes.FETCH_CLAN, fetchClanWorker);
}

export function* leaveClanWorker(action: ReturnType<typeof actions.leaveClan>): any {
	const token = ''; //yield select((state: IRootState) => state.user.token);
	const clanId = yield select((state: IRootState) => state.clan.item.id);

	try {
		yield call(leaveClan, clanId, token);
		yield put(actions.leaveClan());
	} catch (error) {}
}

export function* leaveClanWatcher() {
	yield takeEvery(actionTypes.LEAVE_CLAN, leaveClanWorker);
}

export default function* clanSaga() {
	yield all([fetchClanWatcher(), leaveClanWatcher()]);
}
