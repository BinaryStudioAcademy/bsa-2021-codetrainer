import { all } from 'redux-saga/effects';
import socialSettingsSaga from '../social/logic/saga';

export default function* settingsSaga() {
	yield all([socialSettingsSaga()]);
}
