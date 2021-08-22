import {
	getCommunityByUserId,
	getFollowersByUserId,
	getFollowingsByUserId,
} from './../../../services/follower/followers.service';
import { fetchUsersSearch } from 'services';
import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';

export function* fetchUserSearch({ query }: ReturnType<typeof actions.searchUser>) {
	try {
		yield put(actions.clearData());
		const { user } = yield call(fetchUsersSearch, query);
		const { followings } = yield call(getFollowingsByUserId, user.id);
		const { followers } = yield call(getFollowersByUserId, user.id);
		const community: string[] = yield call(getCommunityByUserId, user.id);
		const userDataAllFields = {
			...user,
			followingQuantity: followings.length,
			followersQuantity: followers.length,
			communityQuantity: community.length,
		};
		yield put(actions.searchUserSuccess({ user: userDataAllFields }));
	} catch (error) {
		yield put(actions.searchUserError({ payload: error?.errors ?? error?.message ?? 'unknown error' }));
	}
}

function* watchFetchSearch() {
	yield takeLatest(actionTypes.SEARCH_USER_FETCH, fetchUserSearch);
}

export default function* SearchSaga() {
	yield all([watchFetchSearch()]);
}
