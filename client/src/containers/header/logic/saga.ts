import { all } from 'redux-saga/effects';
import { NotificationSaga } from '../notifications/logic/saga';

export default function* headerSaga() {
	yield all([NotificationSaga()]);
}
