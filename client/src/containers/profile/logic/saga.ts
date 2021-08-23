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

const getIChallenge = (
	tasks: Array<{
		id: string;
		name: string;
		rank?: number | null;
		tags: Array<{
			id: string;
			name: string;
		}>;
	}>,
	user: {
		username: string;
		name: string;
		surname: string;
	},
) => {
	return tasks.map((task) => {
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
			tags: task.tags.map((tag) => tag.name),
		};
	});
};

export function* fetchUserSearch({ query }: ReturnType<typeof actions.searchUser>) {
	try {
		yield put(actions.clearData());
		const { user } = yield call(fetchUsersSearch, query);
		const { followings } = yield call(getFollowingsByUserId, user.id);
		const { followers } = yield call(getFollowersByUserId, user.id);
		const community: string[] = yield call(getCommunityByUserId, user.id);
		const tasks: any[] = yield all(
			user.tasks.map((taskObj: any) => {
				const task = call(getTaskById, taskObj.id);
				return task;
			}),
		);
		const publishedTasks = tasks.filter((task) => task.isPublished === true);
		const unpublishedTasks = tasks.filter((task) => task.isPublished === false);
		const publishedTasksProps = getIChallenge(publishedTasks, user);
		const unpublishedTasksProps = getIChallenge(unpublishedTasks, user);
		const userDataAllFields = {
			...user,
			followingQuantity: followings.length,
			followersQuantity: followers.length,
			communityQuantity: community.length,
			publishedTasks: publishedTasksProps,
			unpublishedTasks: unpublishedTasksProps,
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
