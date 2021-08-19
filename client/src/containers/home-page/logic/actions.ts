import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const getTasks = createAction<actionTypes.TGetTask>(actionTypes.GET_TASKS);
export const setTask = createAction<actionTypes.TSetTask>(actionTypes.SET_TASK);
export const getMessages = createAction(actionTypes.GET_MESSAGES);
export const setMessages = createAction<actionTypes.TSetMessages>(actionTypes.SET_MESSAGES);
