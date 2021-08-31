import { WebApi } from 'typings/webapi';
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
import { IUser } from 'typings/common/IUser';
import { ROUTES } from 'constants/routes';

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
				link: '/users/' + user.username,
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
		};
	});
};

export function* fetchUserSearch({ query }: ReturnType<typeof actions.searchUser>): any {
	try {
		yield put(actions.clearData());
		const { user } = yield call(fetchUsersSearch, query);
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

		const followersSocialProps = getISocialUsers(user.followersSocial);
		const followingsSocialProps = getISocialUsers(user.followingsSocial);
		const communitySocialProps = getISocialUsers(user.communitySocial);

		const userDataAllFields = {
			...user,
			followingQuantity: followings.length,
			followersQuantity: followers.length,
			communityQuantity: community.length,
			publishedTasks: publishedTasksProps,
			unpublishedTasks: unpublishedTasksProps,
			followersSocial: followersSocialProps,
			followingsSocial: followingsSocialProps,
			communitySocial: communitySocialProps,
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
