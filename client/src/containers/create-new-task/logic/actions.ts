import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const setTask = createAction<actionTypes.TSetTaskArgs>(actionTypes.SET_TASK);
