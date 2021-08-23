import * as actionTypes from './action-types';
import { createAction } from 'helpers/create-action.helper';

export const startLoading = createAction<void>(actionTypes.START_LOADING);
export const fetchClans = createAction<void>(actionTypes.FETCH_CLANS);
export const fetchClan = createAction<actionTypes.IFetchClanArgs>(actionTypes.FETCH_CLAN);
export const endLoading = createAction<void>(actionTypes.END_LOADING);
export const clearClans = createAction<void>(actionTypes.CLEAR_CLANS);
export const addClans = createAction<actionTypes.IAddClansArgs>(actionTypes.ADD_CLANS);
export const addError = createAction<actionTypes.IAddErrorArgs>(actionTypes.ADD_ERROR);
export const joinClan = createAction<actionTypes.IJoinClanArgs>(actionTypes.JOIN_CLAN);
export const leaveClan = createAction<actionTypes.ILeaveClanArgs>(actionTypes.LEAVE_CLAN);
export const updateClan = createAction<actionTypes.IUpdateClanArgs>(actionTypes.UPDATE_CLAN);
// export const sortClansByTime = createAction<void>(actionTypes.SORT_BY_TIME);
// export const sortClansByRank = createAction<void>(actionTypes.SORT_BY_RANK);
// export const sortClansBySize = createAction<void>(actionTypes.SORT_BY_SIZE);

export const setOrderBy = createAction<actionTypes.ISetOrderByArgs>(actionTypes.SET_ORDER_BY);
export const setOrder = createAction<actionTypes.ISetOrderArgs>(actionTypes.SET_ORDER);
