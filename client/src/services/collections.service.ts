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
