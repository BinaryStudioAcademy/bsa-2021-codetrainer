import * as actionTypes from './action-types';
import { createAction } from 'helpers/create-action.helper';

export const startLoading = createAction<void>(actionTypes.START_LOADING);
export const fetchUsers = createAction<void>(actionTypes.FETCH_USERS);
export const endLoading = createAction<void>(actionTypes.END_LOADING);

export const addUsers = createAction<actionTypes.IAddUsersArgs>(actionTypes.ADD_USERS);
export const addError = createAction<actionTypes.IAddErrorArgs>(actionTypes.ADD_ERROR);

export const setNameQuery = createAction<actionTypes.ISetNameQueryArgs>(actionTypes.SET_NAME_QUERY);
export const setPage = createAction<actionTypes.ISetPageArgs>(actionTypes.SET_PAGE);
export const setItemsPerPage = createAction<actionTypes.ISetItemsPerPageArgs>(actionTypes.SET_ITEMS_PER_PAGE);

export const clearData = createAction<void>(actionTypes.CLEAR_DATA);
export const clearAllLeadersData = createAction<void>(actionTypes.CLEAR_ALL_LEADERS_DATA);
