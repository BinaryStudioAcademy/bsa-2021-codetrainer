import { fetchClans, joinClan, leaveClan } from 'services/clans.service';
import { all, put, call, select, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { IRootState } from 'typings/root-state';

export function* fetchClansWorker(action: ReturnType<typeof actions.fetchClans>): any {
	yield put(actions.startLoading());

	const options = yield select((state: IRootState) => state.clans.options);
	const response = yield call(fetchClans, options);

	if (response instanceof Error) {
		yield put(actions.addError({ error: response.message }));
	} else {
		yield put(actions.addClans({ clans: response }));
	}

	yield put(actions.endLoading());
}

export function* fetchClansWatcher() {
	yield takeEvery(actionTypes.FETCH_CLANS, fetchClansWorker);
}

export function* joinClanWorker({ id }: ReturnType<typeof actions.joinClan>): any {
	yield put(actions.startLoading());

	const response = yield call(joinClan, id);

	if (response instanceof Error) {
		yield put(actions.addError({ error: response.message }));
	} else {
		yield put(
			actions.updateClan({
				id: response.id,
				clan: response,
			}),
		);
	}

	yield put(actions.endLoading());
}

export function* joinClanWatcher() {
	yield takeEvery(actionTypes.JOIN_CLAN, joinClanWorker);
}

export function* leaveClanWorker({ id }: ReturnType<typeof actions.joinClan>): any {
	yield put(actions.startLoading());

	const response = yield call(leaveClan, id);

	if (response instanceof Error) {
		yield put(actions.addError({ error: response.message }));
	} else {
		yield put(
			actions.updateClan({
				id: response.id,
				clan: response,
			}),
		);
	}

	yield put(actions.endLoading());
}

export function* leaveClanWatcher() {
	yield takeEvery(actionTypes.LEAVE_CLAN, leaveClanWorker);
}

export default function* clansSaga() {
	yield all([fetchClansWatcher(), joinClanWatcher(), leaveClanWatcher()]);
}
