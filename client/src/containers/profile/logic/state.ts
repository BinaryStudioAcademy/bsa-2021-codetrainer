import { IChallenge } from 'components/common/challenge/types';
import { IUser } from 'typings/common/IUser';
import { ActiveTabId } from './models';

export interface IProfileState {
	activeTab: ActiveTabId;
	isLoading: boolean;
	error: string | null;
	isSuccess: boolean;
	userData:
		| (IUser & {
				followingQuantity?: number;
				followersQuantity?: number;
				communityQuantity?: number;
				memberSince?: string;
				lastSeen?: string;
				score?: number;
				publishedTasks?: IChallenge[];
				unpublishedTasks?: IChallenge[];
				followersSocial?: IUser[];
				followingsSocial?: IUser[];
				communitySocial?: IUser[];
		  })
		| null;
}

export const initialState: IProfileState = {
	activeTab: ActiveTabId.Stats,
	isLoading: true,
	error: null,
	isSuccess: false,
	userData: null,
};
