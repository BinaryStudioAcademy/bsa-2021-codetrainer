import * as actionTypes from './action-types';
import { createAction } from 'helpers/create-action.helper';

export const startLoading = createAction<void>(actionTypes.START_LOADING);
export const fetchClans = createAction<void>(actionTypes.FETCH_CLANS);
export const fetchClan = createAction<actionTypes.IFetchClanArgs>(actionTypes.FETCH_CLAN);
export const endLoading = createAction<void>(actionTypes.END_LOADING);

export const addClans = createAction<actionTypes.IAddClansArgs>(actionTypes.ADD_CLANS);
export const addError = createAction<actionTypes.IAddErrorArgs>(actionTypes.ADD_ERROR);
export const updateClan = createAction<actionTypes.IUpdateClanArgs>(actionTypes.UPDATE_CLAN);

export const setOrderBy = createAction<actionTypes.ISetOrderByArgs>(actionTypes.SET_ORDER_BY);
export const setOrder = createAction<actionTypes.ISetOrderArgs>(actionTypes.SET_ORDER);
export const setNameQuery = createAction<actionTypes.ISetNameQueryArgs>(actionTypes.SET_NAME_QUERY);
export const setPage = createAction<actionTypes.ISetPageArgs>(actionTypes.SET_PAGE);
export const setItemsPerPage = createAction<actionTypes.ISetItemsPerPageArgs>(actionTypes.SET_ITEMS_PER_PAGE);

export const clearClans = createAction<void>(actionTypes.CLEAR_CLANS);
export const clearAllClansData = createAction<void>(actionTypes.CLEAR_ALL_CLANS_DATA);
