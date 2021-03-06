import { WebApi } from 'typings/webapi';
import {
	getCommunityByUserId,
	getFollowersByUserId,
	getFollowingsByUserId,
} from './../../../services/follower/followers.service';
import { fetchUsersSearch, getUserById } from 'services';
import { all, put, call, takeLatest, select, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';
import * as userActions from '../../user/logic/actions';
import { getTaskById } from 'services/task/task.service';
import { IUser } from 'typings/common/IUser';
import { ROUTES } from 'constants/routes';
import { mapUserResponseToUser } from 'helpers/user.helper';
import { followUser, unfollowUser } from 'services/followers.service';

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
			linkToTask: `${ROUTES.TaskInfo}/${task.id}`,
			author: {
				firstName: user.name,
				lastName: user.surname,
				username: user.username,
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

const getISocialUsers = (users: IUser[]) => {
	return users.map((user: IUser) => {
		return {
			id: user.id,
			rank: user.rank ? user.rank : 9,
			profileUrl: '',
			username: user.username,
			name: user.name,
			clan: {
				name: user.clan?.name ? user.clan?.name : 'No clan',
				id: user.clan?.id ?? null,
			} as WebApi.Entities.IClan,
			honor: user.honor,
			avatar: user.avatar,
		};
	});
};

export function* fetchUserSearch({ query }: ReturnType<typeof actions.searchUser>): any {
	try {
		yield put(actions.clearData());
		const { user: res } = yield call(fetchUsersSearch, query);
		const user = yield call(mapUserResponseToUser, res);

		const { followings } = yield call(getFollowingsByUserId, user.id);
		const { followers } = yield call(getFollowersByUserId, user.id);
		const community: IUser[] = yield call(getCommunityByUserId, user.id);
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

		let followersSocial: any[] = yield all(
			followers.map(({ user }: any) => {
				const gotUser = call(getUserById, user.id);
				return gotUser;
			}),
		);
		let followingsSocial: any[] = yield all(
			followings.map(({ following }: any) => {
				const user = call(getUserById, following.id);
				return user;
			}),
		);
		let communitySocial: any[] = yield all(
			community.map((community: IUser) => {
				const user = call(getUserById, community.id);
				return user;
			}),
		);

		followersSocial = followersSocial.map((followerUser) => followerUser.user);
		followingsSocial = followingsSocial.map((followingUser) => followingUser.user);
		communitySocial = communitySocial.map((communityUser) => communityUser.user);

		const followersSocialProps = getISocialUsers(followersSocial);
		const followingsSocialProps = getISocialUsers(followingsSocial);
		const communitySocialProps = getISocialUsers(communitySocial);

		const userDataAllFields = {
			...user,
			followingQuantity: followings.length,
			followersQuantity: followers.length,
			communityQuantity: community.length,
			publishedTasks: publishedTasksProps,
			unpublishedTasks: unpublishedTasksProps,
			followersSocial: followersSocialProps,
			followingsSocial: followingsSocialProps,
			comminitySocial: communitySocialProps,
		};
		yield put(actions.searchUserSuccess({ user: userDataAllFields }));
	} catch (error) {
		yield put(actions.searchUserError({ payload: (error as Error)?.message ?? 'unknown error' }));
	}
}

function* watchFetchSearch() {
	yield takeLatest(actionTypes.SEARCH_USER_FETCH, fetchUserSearch);
}

function* followUserWorker({ id }: ReturnType<typeof actions.followUser>): any {
	try {
		const followingUser = yield call(followUser, id);
		yield put(actions.updateProfile({ user: followingUser }));

		const currentUser = yield select((state) => state.auth.userData.user);
		const updatedUser = yield call(getUserById, currentUser.id);

		yield put(userActions.setUser(updatedUser));
	} catch (error) {}
}

function* followUserWatcher() {
	yield takeEvery(actionTypes.FOLLOW_USER, followUserWorker);
}

function* unfollowUserWorker({ id }: ReturnType<typeof actions.unfollowUser>): any {
	try {
		const unfollowedUser = yield call(unfollowUser, id);
		yield put(actions.updateProfile({ user: unfollowedUser }));

		const currentUser = yield select((state) => state.auth.userData.user);
		const updatedUser = yield call(getUserById, currentUser.id);

		yield put(userActions.setUser(updatedUser));
	} catch (error) {}
}

function* unfollowUserWatcher() {
	yield takeEvery(actionTypes.UNFOLLOW_USER, unfollowUserWorker);
}

export default function* SearchSaga() {
	yield all([watchFetchSearch(), followUserWatcher(), unfollowUserWatcher()]);
}
