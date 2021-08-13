import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const searchChangeFilter = createAction<actionTypes.TSearchChangeFilter>(actionTypes.SEARCH_CHANGE_FILTER);
export const searchSetData = createAction<actionTypes.TSearchSetData>(actionTypes.SEARCH_SET_DATA);
export const searchFetchData = createAction<actionTypes.TSearchChangeFilter>(actionTypes.SEARCH_BEFORE_FETCH);
export const searchError = createAction<actionTypes.TSearchError>(actionTypes.SEARCH_ERROR);
export const searchStateReset = createAction(actionTypes.SEARCH_STATE_RESET);
export const searchBeforeFetch = createAction(actionTypes.SEARCH_BEFORE_FETCH);
export const searchSuccess = createAction(actionTypes.SEARCH_SUCCESS);
