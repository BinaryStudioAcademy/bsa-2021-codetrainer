import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const fetchClans = createAction<void>(actionTypes.FETCH_CLANS);
export const addClans = createAction<actionTypes.TAddArgs>(actionTypes.ADD_CLANS);
export const joinClan = createAction<actionTypes.TJoinArgs>(actionTypes.JOIN_CLAN);
export const leaveClan = createAction<actionTypes.TLeaveArgs>(actionTypes.LEAVE_CLAN);
export const updateClan = createAction<actionTypes.TUpdateArgs>(actionTypes.UPDATE_CLAN);
export const sortClansByTime = createAction<void>(actionTypes.SORT_BY_TIME);
export const sortClansByRank = createAction<void>(actionTypes.SORT_BY_RANK);
export const sortClansBySize = createAction<void>(actionTypes.SORT_BY_SIZE);
