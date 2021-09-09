import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const setTask = createAction<actionTypes.TSetTask>(actionTypes.SET_TASK);
export const setTasks = createAction<actionTypes.TSetTasks>(actionTypes.SET_TASKS);
export const saveTask = createAction<actionTypes.TSetTask>(actionTypes.SAVE_TASK);
export const changeTask = createAction<actionTypes.TChangeTask>(actionTypes.CHANGE_TASK);
export const addTask = createAction<actionTypes.TAddTask>(actionTypes.ADD_TASK);
export const loadTasks = createAction(actionTypes.LOAD_TASKS);
export const errors = createAction<actionTypes.TErrors>(actionTypes.ERRORS);
export const success = createAction<actionTypes.TSuccess>(actionTypes.SUCCESS);
export const loading = createAction<actionTypes.TLoading>(actionTypes.LOADING);
export const taskValidation = createAction<actionTypes.TTaskValidation>(actionTypes.TASK_VALIDATION);
export const setTestResult = createAction<actionTypes.TSetTestResult>(actionTypes.SET_TEST_RESULT);
export const deleteTask = createAction<actionTypes.TDeleteTask>(actionTypes.DELETE_TASK);
export const fetchDeleteTask = createAction(actionTypes.FETCH_DELETE_TASK);
export const publishTask = createAction(actionTypes.PUBLISH_TASK);
