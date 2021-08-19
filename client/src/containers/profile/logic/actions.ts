import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const setActiveTab = createAction<actionTypes.TSetActiveTabArgs>(actionTypes.SET_ACTIVE_TAB);

export const searchSetData = createAction<actionTypes.TSearchSetData>(actionTypes.SEARCH_SET_DATA);
export const searchSetSubmit = createAction<actionTypes.TSearchSetSubmit>(actionTypes.SEARCH_SET_SUBMIT);
export const searchFetchData = createAction<any>(actionTypes.SEARCH_FETCH);
export const searchError = createAction<actionTypes.TSearchError>(actionTypes.SEARCH_ERROR);
export const searchBeforeFetch = createAction(actionTypes.SEARCH_BEFORE_FETCH);
export const searchSuccess = createAction(actionTypes.SEARCH_SUCCESS);

