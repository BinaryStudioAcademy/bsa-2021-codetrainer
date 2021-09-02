import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const setActiveTab = createAction<actionTypes.TSetActiveTabArgs>(actionTypes.SET_ACTIVE_TAB);

export const searchUser = createAction<any>(actionTypes.SEARCH_USER_FETCH);
export const searchUserError = createAction<actionTypes.TSearchError>(actionTypes.SEARCH_USER_ERROR);
export const updateProfile = createAction<actionTypes.TUpdateProfile>(actionTypes.UPDATE_PROFILE);
export const followUser = createAction<actionTypes.TFollowUser>(actionTypes.FOLLOW_USER);
export const unfollowUser = createAction<actionTypes.TUnfollowUser>(actionTypes.UNFOLLOW_USER);
export const searchUserSuccess = createAction<any>(actionTypes.SEARCH_USER_SUCCESS);
export const clearData = createAction(actionTypes.CLEAR_DATA);
