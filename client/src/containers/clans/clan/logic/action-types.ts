import { IClanForm } from 'components/modals/clan-modal';
import { ISortingStrategy } from 'components/pages/clans/clan/components/sort-label/types';
import { MembersSortStrategy, ClanPageStatus, IMembersFilter } from './types';
import { WebApi } from 'typings/webapi';

export const SET_STATUS = 'CLAN:SET_STATUS';
export const SET_EDIT_STATUS = 'CLAN:SET_EDIT_STATUS';
export const SET_INVITATION_STATUS = 'CLAN:SET_INVITATION_STATUS';
export const SET_CLAN = 'CLAN:SET_CLAN';
export const SET_COMMUNITY = 'CLAN:SET_COMMUNITY';
export const CLEAR_CLAN = 'CLAN:CLEAR_CLAN';
export const SET_ERROR = 'CLAN:SET_ERROR';
export const SET_MEMBERS_SORT = 'CLAN:SET_MEMBERS_SORT';
export const SET_MEMBERS_FILTER = 'CLAN:SET_MEMBERS_FILTER';

export const FETCH_CLAN = 'CLAN:FETCH_CLAN';
export const FETCH_COMMUNITY = 'CLAN:FETCH_COMMUNITY';
export const UPDATE_CLAN = 'CLAN:UPDATE_CLAN';
export const JOIN_CLAN = 'CLAN:JOIN_CLAN';
export const TOGGLE_CLAN_MEMBER = 'CLAN:TOGGLE_CLAN_MEMBER';

export interface IFetchClanArgs {
	id: string;
}

export interface IFetchCommunityArgs {
	userId: string;
}

export interface ISetStatusArgs {
	status: ClanPageStatus;
}

export interface ISetClansArgs {
	clan?: WebApi.Entities.IClan;
}

export interface ISetCommunityArgs {
	community: WebApi.Entities.IUser[];
}

export interface ISetErrorArgs {
	error?: string;
}

export interface ISetMembersSortArgs {
	sort: ISortingStrategy<MembersSortStrategy>;
}

export interface ISetMembersFilterArgs {
	filter?: Partial<IMembersFilter>;
}

export interface IUpdateClanArgs {
	id: string;
	form: IClanForm;
}
