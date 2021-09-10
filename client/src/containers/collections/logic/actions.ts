import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const fetchCollections = createAction<actionTypes.TFetchCollections>(actionTypes.FETCH_COLLECTIONS);
export const setCollections = createAction<actionTypes.TSetCollections>(actionTypes.SET_COLLECTIONS);
export const startLoading = createAction(actionTypes.START_LOADING);
export const endLoading = createAction(actionTypes.END_LOADING);
export const setSelectedTask = createAction<actionTypes.TSetSelectedTask>(actionTypes.SET_SELECTED_TASK);
export const clearSelectedTask = createAction(actionTypes.CLEAR_SELECTED_TASK);
