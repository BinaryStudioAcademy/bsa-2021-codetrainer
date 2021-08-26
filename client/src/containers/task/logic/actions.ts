import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const getTask = createAction<actionTypes.TGetTask>(actionTypes.GET_TASK);
export const setTask = createAction<actionTypes.TSetTask>(actionTypes.SET_TASK);
export const setNotFound = createAction<actionTypes.TSetNotFound>(actionTypes.SET_NOT_FOUND);
export const getTasks = createAction<actionTypes.TGetTasks>(actionTypes.GET_TASKS);
export const setTasks = createAction<actionTypes.TSetTasks>(actionTypes.SET_TASKS);
