import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const updateExample = createAction<actionTypes.UpdateExampleArgs>(actionTypes.UPDATE);
export const getExampleText = createAction<actionTypes.GetExampleTextArgs>(actionTypes.TRIGGER_UPDATE_TEXT);
