import { fetchClans, joinClan, leaveClan } from 'services/clans.service';
import { all, put, call, select, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { IRootState } from 'typings/root-state';

export function* fetchClansWorker(action: ReturnType<typeof actions.fetchClans>): any {
	const options = yield select((state: IRootState) => state.clans.options);
	const clans = yield call(fetchClans, options);
	yield put(actions.addClans({ clans }));
}

export function* fetchClansWatcher() {
	yield takeEvery(actionTypes.FETCH_CLANS, fetchClansWorker);
}

export function* joinClanWorker(action: ReturnType<typeof actions.joinClan>): any {
	const { clanId } = action;

	try {
		const updatedClan = yield call(joinClan, clanId);
		yield put(
			actions.updateClan({
				clan: updatedClan,
			}),
		);
	} catch (error) {}
}

export function* joinClanWatcher() {
	yield takeEvery(actionTypes.JOIN_CLAN, joinClanWorker);
}

export function* leaveClanWorker(action: ReturnType<typeof actions.joinClan>): any {
	const { clanId } = action;

	try {
		const updatedClan = yield call(leaveClan, clanId);
		yield put(
			actions.updateClan({
				clan: updatedClan,
			}),
		);
	} catch (error) {}
}

export function* leaveClanWatcher() {
	yield takeEvery(actionTypes.LEAVE_CLAN, leaveClanWorker);
}

export default function* clansSaga() {
	yield all([fetchClansWatcher(), joinClanWatcher(), leaveClanWatcher()]);
}
