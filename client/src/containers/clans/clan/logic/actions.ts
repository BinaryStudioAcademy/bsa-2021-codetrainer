import * as actionTypes from './action-types';
import { createAction } from 'helpers/create-action.helper';
import { ClanPageStatus } from './types';

export const setStatus = createAction<actionTypes.ISetStatusArgs>(actionTypes.SET_STATUS);
export const setEditStatus = createAction<actionTypes.ISetStatusArgs>(actionTypes.SET_EDIT_STATUS);
export const setInvitationStatus = createAction<actionTypes.ISetStatusArgs>(actionTypes.SET_INVITATION_STATUS);
export const setClan = createAction<actionTypes.ISetClansArgs>(actionTypes.SET_CLAN);
export const setCommunity = createAction<actionTypes.ISetCommunityArgs>(actionTypes.SET_COMMUNITY);
export const setError = createAction<actionTypes.ISetErrorArgs>(actionTypes.SET_ERROR);
export const setMembersSort = createAction<actionTypes.ISetMembersSortArgs>(actionTypes.SET_MEMBERS_SORT);
export const setMembersFilter = createAction<actionTypes.ISetMembersFilterArgs>(actionTypes.SET_MEMBERS_FILTER);
export const loadingStatus = () => setStatus({ status: ClanPageStatus.LOADING });
export const successStatus = () => setStatus({ status: ClanPageStatus.SUCCESS });
export const errorStatus = () => setStatus({ status: ClanPageStatus.ERROR });
export const clearClan = () => setClan({});
export const clearError = () => setError({});

export const fetchClan = createAction<actionTypes.IFetchClanArgs>(actionTypes.FETCH_CLAN);
export const fetchCommunity = createAction<actionTypes.IFetchCommunityArgs>(actionTypes.FETCH_COMMUNITY);
export const createClan = createAction<actionTypes.ICreateClanArgs>(actionTypes.CREATE_CLAN);
export const updateClan = createAction<actionTypes.IUpdateClanArgs>(actionTypes.UPDATE_CLAN);
export const deleteClan = createAction<void>(actionTypes.DELETE_CLAN);
export const toggleClanMember = createAction<void>(actionTypes.TOGGLE_CLAN_MEMBER);
export const deleteMember = createAction<actionTypes.IDeleteMember>(actionTypes.DELETE_MEMBER);
export const makeAdmin = createAction<actionTypes.IMakeAdmin>(actionTypes.MAKE_ADMIN);
