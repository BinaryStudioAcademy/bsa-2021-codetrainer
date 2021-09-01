import { HttpMethods } from 'constants/services';
import { FollowersApiPath } from 'enum';
import { http } from 'services';
import { IUser } from 'typings/common/IUser';
import { ROUTES } from '../constants/routes';

export const fetchCommunity = async (id: string): Promise<Record<string, any>> => {
	const community = await http.callWebApi({
		method: 'GET',
		endpoint: `${ROUTES.Community}/${id}`,
	});

	return community;
};

export const followUser = async (id: string): Promise<IUser | Error> => {
	try {
		const followingUser = await http.callWebApi({
			method: HttpMethods.POST,
			endpoint: `${FollowersApiPath.ROOT}/${id}`,
		});

		return followingUser;
	} catch (error) {
		return error;
	}
};

export const unfollowUser = async (id: string): Promise<IUser | Error> => {
	try {
		const unfollowedUser = await http.callWebApi({
			method: HttpMethods.DELETE,
			endpoint: `${FollowersApiPath.ROOT}/${id}`,
		});

		return unfollowedUser;
	} catch (error) {
		return error;
	}
};
