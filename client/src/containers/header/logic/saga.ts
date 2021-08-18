import { all } from 'redux-saga/effects';
import { NotificationSaga } from '../notifications/logic/saga';

export function* headerSaga() {
	yield all([NotificationSaga()]);
}
