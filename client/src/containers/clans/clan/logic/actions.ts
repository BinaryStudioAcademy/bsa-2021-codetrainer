import * as actionTypes from './action-types';
import { createAction } from 'helpers/create-action.helper';

export const startLoading = createAction<void>(actionTypes.START_LOADING);
export const fetchClan = createAction<actionTypes.IFetchClanArgs>(actionTypes.FETCH_CLAN);
export const endLoading = createAction<void>(actionTypes.END_LOADING);
export const clearClan = createAction<void>(actionTypes.CLEAR_CLAN);
export const setClan = createAction<actionTypes.ISetClansArgs>(actionTypes.SET_CLAN);
export const addError = createAction<actionTypes.IAddErrorArgs>(actionTypes.ADD_ERROR);
export const leaveClan = createAction<void>(actionTypes.LEAVE_CLAN);
export const sortClanMemberByTime = createAction<void>(actionTypes.SORT_MEMBERS_BY_TIME);
export const sortClanMemberByRank = createAction<void>(actionTypes.SORT_MEMBERS_BY_RANK);
