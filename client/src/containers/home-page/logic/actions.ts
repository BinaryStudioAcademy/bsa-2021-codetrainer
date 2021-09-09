import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const getTasks = createAction<actionTypes.TGetTask>(actionTypes.GET_TASKS);
export const setTask = createAction<actionTypes.TSetTask>(actionTypes.SET_TASK);
export const getMessages = createAction(actionTypes.GET_MESSAGES);
export const setErrors = createAction<actionTypes.TSetErrors>(actionTypes.SET_ERRORS);
export const setMessages = createAction<actionTypes.TSetMessages>(actionTypes.SET_MESSAGES);
export const getCommunity = createAction<actionTypes.TGetCommunity>(actionTypes.GET_COMMUNITY);
export const setCommunity = createAction<actionTypes.TSetCommunity>(actionTypes.SET_COMMUNITY);
export const getFocusTask = createAction<actionTypes.TGetFocusTask>(actionTypes.GET_FOCUS_TASK);
