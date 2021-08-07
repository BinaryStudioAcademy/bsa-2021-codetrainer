import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const fetchClan = createAction<actionTypes.TFetchArgs>(actionTypes.FETCH_CLAN);
export const setClan = createAction<actionTypes.TSetArgs>(actionTypes.SET_CLAN);
export const leaveClan = createAction<void>(actionTypes.LEAVE_CLAN);
export const sortClanMemberByTime = createAction<void>(actionTypes.SORT_MEMBERS_BY_TIME);
export const sortClanMemberByRank = createAction<void>(actionTypes.SORT_MEMBERS_BY_RANK);
