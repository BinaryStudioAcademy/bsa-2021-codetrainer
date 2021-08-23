import {
	getCommunityByUserId,
	getFollowersByUserId,
	getFollowingsByUserId,
} from './../../../services/follower/followers.service';
import { fetchUsersSearch } from 'services';
import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { getTaskById } from 'services/task/task.service';

export function* fetchUserSearch({ query }: ReturnType<typeof actions.searchUser>) {
	try {
		yield put(actions.clearData());
		const { user } = yield call(fetchUsersSearch, query);
		const { followings } = yield call(getFollowingsByUserId, user.id);
		const { followers } = yield call(getFollowersByUserId, user.id);
		const community: string[] = yield call(getCommunityByUserId, user.id);
		const tasks: any[] = yield user.tasks.map((taskObj: any) => {
			const task = call(getTaskById, taskObj.id);
			console.log(task);
			return task;
		});
		console.log(tasks);

		const publishedTasks = tasks.map((task) => {
			return {
				id: task.id,
				linkToAuthor: '/users/' + user.username,
				author: {
					firstName: user.name,
					lastName: user.surname,
					link: '/',
				},
				stats: {
					favoriteSaves: 12,
					positiveFeedback: 12,
				},
				title: task.name,
				rank: task.rank ? task.rank : 9,
				tags: ['Tag 1', 'Tag 2'],
			};
		});
		console.log(publishedTasks);

		const userDataAllFields = {
			...user,
			followingQuantity: followings.length,
			followersQuantity: followers.length,
			communityQuantity: community.length,
			publishedTasks,
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
