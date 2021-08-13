import { fetchClan, toggleClanMember } from 'services/clans.service';
import { all, put, call, select, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import * as userActions from '../../../user/logic/actions';
import { IRootState } from 'typings/root-state';

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
	} else {
		yield put(userActions.setUser({ user: response.user }));
	}

	yield put(actions.endLoading());
}

export function* leaveClanWatcher() {
	yield takeEvery(actionTypes.LEAVE_CLAN, leaveClanWorker);
}

export default function* clanSaga() {
	yield all([fetchClanWatcher(), leaveClanWatcher()]);
}
