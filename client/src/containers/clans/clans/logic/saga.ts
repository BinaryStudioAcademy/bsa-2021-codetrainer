import { fetchClans } from 'services/clans.service';
import { all, put, call, select, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { IRootState } from 'typings/root-state';
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from 'containers/notification/logic/models';

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

export default function* clansSaga() {
	yield all([fetchClansWatcher()]);
}
