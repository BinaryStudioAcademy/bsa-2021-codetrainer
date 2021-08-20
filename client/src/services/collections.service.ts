import { followedCollectionsMocks, authoredCollectionsMocks } from './../containers/profile/tabs/collections/mocks';
import { WebApi } from 'typings/webapi';

interface IPaginationResponse<T> {
	items: T[];
	full: number;
	hasMore: boolean;
}

export interface TUserCollectionsRequestArgs {
	userId: string;
	skip: number;
	limit: number;
}

export type TCollectionsLoader = (args: TUserCollectionsRequestArgs) => Promise<IPaginationResponse<WebApi.Entities.ICollection>>;

// TODO: implement in backend and call api
export const getAuthoredCollections: TCollectionsLoader = async ({ userId: _userId, skip, limit }) => ({
	items: authoredCollectionsMocks.slice(skip, skip + limit),
	full: authoredCollectionsMocks.length,
	hasMore: (skip + limit) < authoredCollectionsMocks.length,
});

// TODO: implement in backend and call api
export const getFollowedCollections: TCollectionsLoader = async ({ userId: _userId, skip, limit }) => ({
	items: followedCollectionsMocks.slice(skip, skip + limit),
	full: followedCollectionsMocks.length,
	hasMore: (skip + limit) < followedCollectionsMocks.length,
});
