import { http } from 'services';
import { FollowersApiPath } from 'enum';

export const getFollowersByUserId = async (id: string): Promise<Record<string, any>> => {
	const followers = await http.callWebApi({
		endpoint: FollowersApiPath.ALL_FOLLOWERS + id,
		method: 'GET',
		skipAuthorization: false,
	});
	return followers;
};

export const getFollowingsByUserId = async (id: string): Promise<Record<string, any>> => {
	const followings = await http.callWebApi({
		endpoint: FollowersApiPath.ALL_FOLLOWINGS + id,
		method: 'GET',
		skipAuthorization: false,
	});
	return followings;
};

export const getCommunityByUserId = async (id: string): Promise<Array<string>> => {
	const { followers: userFollowers } = await getFollowersByUserId(id);
	const { followings: userFollowings } = await getFollowingsByUserId(id);
	const userCommunity: string[] = [];
	userFollowers.forEach(({user}:any) => {
		userFollowings.forEach(({following}:any) => {
			if (user.id === following.id) {
				userCommunity.push(user.id);
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
