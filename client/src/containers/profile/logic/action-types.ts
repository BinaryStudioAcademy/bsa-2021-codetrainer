import { ActiveTabId } from './models';
export const SET_ACTIVE_TAB = 'PROFILE:SET_ACTIVE_TAB';

export const SEARCH_SET_DATA = 'SEARCH:SET_DATA';
export const SEARCH_SET_SUBMIT = 'SEARCH:SET_SUBMIT';
export const SEARCH_ERROR = 'SEARCH:ERROR';
export const SEARCH_SUCCESS = 'SEARCH:SUCCESS';
export const SEARCH_FETCH = 'SEARCH:FETCH';
export const SEARCH_BEFORE_FETCH = 'SEARCH:BEFORE_FETCH';

export type TSearchSetSubmit = {
	payload: boolean;
};

export type TSearchError = {
	payload: any//ISearchState['errors'];
};


export type TSearchSetData = {
	data: any//ISearchState['search'];
};


export type TSetActiveTabArgs = {
	activeTab: ActiveTabId;
};
