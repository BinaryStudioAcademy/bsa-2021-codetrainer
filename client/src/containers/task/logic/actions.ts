import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const getTask = createAction<actionTypes.TGetTask>(actionTypes.GET_TASK);
export const setTask = createAction<actionTypes.TSetTask>(actionTypes.SET_TASK);
export const setNotFound = createAction<actionTypes.TSetNotFound>(actionTypes.SET_NOT_FOUND);
export const getTasks = createAction<actionTypes.TGetTasks>(actionTypes.GET_TASKS);
export const setTasks = createAction<actionTypes.TSetTasks>(actionTypes.SET_TASKS);
export const getNextTask = createAction(actionTypes.GET_NEXT_TASK);
export const setNextTask = createAction<actionTypes.TSetNextTask>(actionTypes.SET_NEXT_TASK);
export const getFollowing = createAction<actionTypes.TGetFollowing>(actionTypes.GET_FOLLOWING);
export const setFollowing = createAction<actionTypes.TSetFollowing>(actionTypes.SET_FOLLOWING);
export const getUserSolution = createAction<actionTypes.TGetUserSolution>(actionTypes.GET_USER_SOLUTION);
export const setUserSolution = createAction<actionTypes.TSetUserSolution>(actionTypes.SET_USER_SOLUTION);
export const unlockSolution = createAction<actionTypes.TUnlockSolution>(actionTypes.UNLOCK_SOLUTION);
export const setIsLoading = createAction<actionTypes.TSetIsLoading>(actionTypes.SET_IS_LOADING);
export const getStats = createAction<actionTypes.TGetStats>(actionTypes.GET_STATS);
export const setStats = createAction<actionTypes.TSetStats>(actionTypes.SET_STATS);
export const skipTask = createAction<actionTypes.TSkipTask>(actionTypes.SKIP_TASK);

export const getComments = createAction(actionTypes.GET_COMMENTS);
export const setComments = createAction<actionTypes.TSetComments>(actionTypes.SET_COMMENTS);
export const addComments = createAction<actionTypes.TAddComments>(actionTypes.ADD_COMMENTS);

export const postComment = createAction<actionTypes.TPostComment>(actionTypes.POST_COMMENT);
export const editComment = createAction<actionTypes.TEditComment>(actionTypes.EDIT_COMMENT);
export const deleteComment = createAction<actionTypes.TDeleteComment>(actionTypes.DELETE_COMMENT);

export const incrementCommentsPage = createAction(actionTypes.INCREMENT_COMMENTS_PAGE);
export const setCommentsPage = createAction<actionTypes.TSetCommentsPage>(actionTypes.SET_COMMENTS_PAGE);
