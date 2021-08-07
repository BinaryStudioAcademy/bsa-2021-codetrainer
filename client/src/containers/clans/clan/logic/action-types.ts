import { IClan } from '../../types';

export const FETCH_CLAN = 'CLAN:FETCH_CLAN';
export const SET_CLAN = 'CLAN:SET_CLAN';
export const LEAVE_CLAN = 'CLAN:LEAVE_CLAN';
export const SORT_MEMBERS_BY_TIME = 'CLAN:SORT_MEMBERS_BY_TIME';
export const SORT_MEMBERS_BY_RANK = 'CLAN:SORT_MEMBERS_BY_RANK';

export type TFetchArgs = {
	id: string;
};

export type TSetArgs = {
	clan: IClan;
};
