import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const fetchTask = createAction<actionTypes.IFetchTaskArgs>(actionTypes.FETCH_TASK);
export const setTask = createAction<actionTypes.ISetTaskArgs>(actionTypes.SET_TASK);
export const fetchSolution = createAction<actionTypes.IFetchSolutionArgs>(actionTypes.FETCH_SOLUTION);
export const setSolution = createAction<actionTypes.ISetSolutionArgs>(actionTypes.SET_SOLUTION);
export const submitSolution = createAction<actionTypes.ISubmitSolutionArgs>(actionTypes.SUBMIT_SOLUTION);
export const startLoading = createAction<void>(actionTypes.START_LOADING);
export const endLoading = createAction<void>(actionTypes.END_LOADING);
export const setResult = createAction<actionTypes.ISetResult>(actionTypes.SET_RESULT);
