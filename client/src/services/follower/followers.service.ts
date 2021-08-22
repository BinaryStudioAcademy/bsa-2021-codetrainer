import { http } from 'services';
import { FollowersApiPath } from 'enum';

export const getFollowersByUserId = async (id: string) => {
	const followers = await http.callWebApi({
		endpoint: FollowersApiPath.ALL_FOLLOWERS + id,
		method: 'GET',
		skipAuthorization: false,
	});
	return followers;
};

export const getFollowingsByUserId = async (id: string) => {
	const followings = await http.callWebApi({
		endpoint: FollowersApiPath.ALL_FOLLOWINGS + id,
		method: 'GET',
		skipAuthorization: false,
	});
	return followings;
};

export const getCommunityByUserId = async (id: string) => {
	const { followers: userFollowers } = await getFollowersByUserId(id);
	const { followings: userFollowings } = await getFollowingsByUserId(id);
	const userCommunity: string[] = [];
	userFollowers.forEach((follower: { id: string; user: string }) => {
		userFollowings.forEach((following: { id: string; user: string }) => {
			if (follower.user === following.user) {
				userCommunity.push(follower.user);
			}
		});
	});
	return userCommunity;
};

export const sendIntitationLetter = async (fromUser: any, toUser: any) => {
	const reqBody = {
		fromUser: JSON.stringify(fromUser),
		toUser: JSON.stringify(toUser),
	};
	await http.callWebApi({
		method: 'POST',
		endpoint: 'mailer/inviteToClan',
		skipAuthorization: false,
		body: reqBody,
	});
};
