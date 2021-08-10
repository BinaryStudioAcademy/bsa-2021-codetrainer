import { IClan, TClans } from '../../types';

export const FETCH_CLANS = 'CLANS:FETCH_CLANS';
export const ADD_CLANS = 'CLANS:ADD_CLAN';
export const JOIN_CLAN = 'CLANS:JOIN_CLAN';
export const LEAVE_CLAN = 'CLANS:LEAVE_CLAN';
export const UPDATE_CLAN = 'CLANS:UPDATE_CLAN';
export const SORT_BY_TIME = 'CLANS:SORT_BY_TIME';
export const SORT_BY_RANK = 'CLANS:SORT_BY_RANK';
export const SORT_BY_SIZE = 'CLANS:SORT_BY_SIZE';

export type TAddArgs = {
	clans: TClans;
};

export type TUpdateArgs = {
	clan: IClan;
};

export type TLeaveArgs = {
	clanId: string;
};

export type TJoinArgs = {
	clanId: string;
};
