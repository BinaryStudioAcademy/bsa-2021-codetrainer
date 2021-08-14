import { ROUTES } from 'constants/routes';
import { IUser } from 'typings/common/IUser';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { githubAuthService } from 'services';
import * as types from './action-types';
import * as actions from './actions';
import * as userActions from 'containers/user/logic/actions';
import historyHelper from 'helpers/history.helper';

function* linkToGithub(action: ReturnType<typeof actions.linkToGithub>) {
	try {
		const { code } = action;
		const user: IUser = yield call({ context: githubAuthService, fn: githubAuthService.link }, code);
		yield put(userActions.setUser({ user }));
		// yield put(actions.githubError({ error: 'щото пашло нитак' }));
	} catch (error) {
		yield put(actions.githubError({ error: error?.message ?? 'unknown error' }));
	} finally {
		historyHelper.push(ROUTES.Setting);
	}
}

function* unlinkFromGithub() {
	try {
		const user: IUser = yield call({ context: githubAuthService, fn: githubAuthService.unlink });
		yield put(userActions.setUser({ user }));
	} catch (error) {
		yield put(actions.githubError({ error: error?.message ?? 'unknown error' }));
	}
}

function* watchLinkToGithub() {
	yield takeLatest(types.SocialSettingsActions.LINK_TO_GITHUB, linkToGithub);
}

function* watchUnlinkFromGithub() {
	yield takeLatest(types.SocialSettingsActions.UNLINK_FROM_GITHUB, unlinkFromGithub);
}

export default function* socialSettingsSaga() {
	yield all([watchLinkToGithub(), watchUnlinkFromGithub()]);
}
