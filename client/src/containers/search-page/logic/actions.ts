import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const searchChangeFilter = createAction<actionTypes.TSearchChangeFilter>(actionTypes.SEARCH_CHANGE_FILTER);
export const searchSetData = createAction<actionTypes.TSearchSetData>(actionTypes.SEARCH_SET_DATA);
export const searchOnSubmit = createAction(actionTypes.SEARCH_ON_SUBMIT);
export const searchFetchData = createAction<actionTypes.TSearchChangeFilter>(actionTypes.SEARCH_FETCH);
export const searchFetchNextPage = createAction<actionTypes.TSearchChangeFilter>(actionTypes.SEARCH_FETCH_NEXT_PAGE);
export const searchAddDataNextPage = createAction<actionTypes.TSearchSetData>(actionTypes.SEARCH_ADD_DATA_NEXT_PAGE);
export const searchBeforeFetchNextPage = createAction(actionTypes.SEARCH_BEFORE_FETCH_NEXT_PAGE);
export const searchChangePage = createAction(actionTypes.SEARCH_CHANGE_PAGE);
export const searchError = createAction<actionTypes.TSearchError>(actionTypes.SEARCH_ERROR);
export const searchBeforeFetch = createAction(actionTypes.SEARCH_BEFORE_FETCH);
export const searchSuccess = createAction(actionTypes.SEARCH_SUCCESS);
export const searchSetFilter = createAction<actionTypes.TSearchSetFilter>(actionTypes.SEARCH_SET_FILTER);
