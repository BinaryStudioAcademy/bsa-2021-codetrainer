import { IUser } from 'typings/common/IUser';
import { ActiveTabId } from './models';
export const SET_ACTIVE_TAB = 'PROFILE:SET_ACTIVE_TAB';

export const SEARCH_USER_FETCH = 'SEARCH_USER:FETCH';
export const SEARCH_USER_ERROR = 'SEARCH_USER:ERROR';
export const SEARCH_USER_SUCCESS = 'SEARCH_USER:SUCCESS';
export const CLEAR_DATA = 'CLEAR_DATA';

export type TSearchError = {
	payload: string;
};

export type TSearchSetData = {
	user: IUser;
};

export type TSetActiveTabArgs = {
	activeTab: ActiveTabId;
};
