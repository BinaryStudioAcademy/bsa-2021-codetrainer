import { ISearchState } from './state';

export const SEARCH_CHANGE_FILTER = 'SEARCH:CHANGE_FILTER';
export const SEARCH_SET_DATA = 'SEARCH:SET_DATA';
export const SEARCH_ON_SUBMIT = 'SEARCH:ON_SUBMIT';
export const SEARCH_ERROR = 'SEARCH:ERROR';
export const SEARCH_SUCCESS = 'SEARCH:SUCCESS';
export const SEARCH_FETCH = 'SEARCH:FETCH';
export const SEARCH_BEFORE_FETCH = 'SEARCH:BEFORE_FETCH';
export const SEARCH_BEFORE_FETCH_NEXT_PAGE = 'SEARCH:BEFORE_FETCH_NEXT_PAGE';
export const SEARCH_FETCH_NEXT_PAGE = 'SEARCH:NEXT_PAGE';
export const SEARCH_ADD_DATA_NEXT_PAGE = 'SEARCH:ADD_DATA_NEXT_PAGE';
export const SEARCH_CHANGE_PAGE = 'SEARCH:CHANGE_PAGE';

export type TSearchSetBooleanData = {
	payload: boolean;
};

export type TSearchError = {
	payload: ISearchState['errors'];
};

export type TSearchChangeFilter = {
	partialFilter: Partial<ISearchState['filter']>;
};

export type TSearchSetData = {
	data: ISearchState['search'];
};
