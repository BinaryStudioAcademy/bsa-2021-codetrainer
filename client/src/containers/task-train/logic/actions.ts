import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const fetchTask = createAction<actionTypes.IFetchTaskArgs>(actionTypes.FETCH_TASK);
export const setTask = createAction<actionTypes.ISetTaskArgs>(actionTypes.SET_TASK);
export const setNextTaskId = createAction<actionTypes.ISetNextTaskId>(actionTypes.SET_NEXT_TASK_ID);
export const changeStatus = createAction<actionTypes.IChangeStatus>(actionTypes.CHANGE_STATUS);
export const loadPage = createAction(actionTypes.LOAD_PAGE);
export const patchSolution = createAction<actionTypes.IPatchSolution>(actionTypes.PATCH_SOLUTION);
export const setSolution = createAction<actionTypes.ISetSolutionArgs>(actionTypes.SET_SOLUTION);
export const submitSolution = createAction<actionTypes.ISubmitSolutionArgs>(actionTypes.SUBMIT_SOLUTION);
export const startLoading = createAction<void>(actionTypes.START_LOADING);
export const endLoading = createAction<void>(actionTypes.END_LOADING);
export const setTestResult = createAction<actionTypes.ISetTestResult>(actionTypes.SET_TEST_RESULT);
export const setActiveTab = createAction<actionTypes.ISetActiveTAb>(actionTypes.SET_ACTIVE_TAB);
export const setErrors = createAction<actionTypes.IErrors>(actionTypes.ERRORS);
