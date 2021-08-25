import { TLoader } from 'typings/common/loader';
import { WebApi } from 'typings/webapi';
import { followedCollectionsMocks, authoredCollectionsMocks } from './../containers/profile/tabs/collections/mocks';

export interface IUserCollectionsRequestArgs extends WebApi.Types.IPaginationRequest {
	userId: string;
}

export type TUserCollectionsLoader = TLoader<IUserCollectionsRequestArgs, WebApi.Entities.ICollection>;

// TODO: implement in backend and call api
export const getAuthoredCollections: TUserCollectionsLoader = async ({ userId: _userId, skip, limit }) => ({
	items: authoredCollectionsMocks.slice(skip, skip + limit),
	full: authoredCollectionsMocks.length,
	hasMore: skip + limit < authoredCollectionsMocks.length,
});

// TODO: implement in backend and call api
export const getFollowedCollections: TUserCollectionsLoader = async ({ userId: _userId, skip, limit }) => ({
	items: followedCollectionsMocks.slice(skip, skip + limit),
	full: followedCollectionsMocks.length,
	hasMore: skip + limit < followedCollectionsMocks.length,
});
