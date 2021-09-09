import { HttpMethods } from 'constants/services/http-methods';
import { http } from 'services';
import { TLoader } from 'typings/common/loader';
import { WebApi } from 'typings/webapi';

export interface IUserCollectionsRequestArgs extends WebApi.Types.TPaginationRequest {
	userId: string;
}

export type TUserCollectionsLoader = TLoader<
	IUserCollectionsRequestArgs,
	WebApi.Types.TPaginationResponse<WebApi.Entities.ICollection, 'collections'>
>;

export const getAuthoredCollections: TUserCollectionsLoader = async ({ userId: author, skip, take }) =>
	http.callWebApi({
		endpoint: 'collections/authored',
		method: HttpMethods.GET,
		skipAuthorization: false,
		query: {
			author,
			skip: skip,
			take: take,
		},
	});

export const getFollowedCollections: TUserCollectionsLoader = async ({ userId: follower, skip, take }) =>
	http.callWebApi({
		endpoint: 'collections/followed',
		method: HttpMethods.GET,
		skipAuthorization: false,
		query: {
			follower,
			skip,
			take,
		},
	});

export const createCollection = async (name: string, taskId: string | null) => {
	const body = {
		name: name,
	};
	try {
		const data = await http.callWebApi({
			method: 'POST',
			endpoint: 'collections',
			body: body,
		});
		if (taskId) {
			addTaskToCollection(data.id, taskId);
		}
		return data;
	} catch (error) {
		return error;
	}
};

export const addTaskToCollection = async (collectionId: string, taskId: string) => {
	try {
		await http.callWebApi({
			method: HttpMethods.PATCH,
			endpoint: 'collections/' + collectionId,
			skipAuthorization: false,
			body: {
				id: taskId,
			},
		});
	} catch (e) {
		console.log(e);
	}
};
