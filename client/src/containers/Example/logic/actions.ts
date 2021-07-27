import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const updateExample = createAction<actionTypes.UpdateExampleArgs>(actionTypes.UPDATE);
export const getExampleText = createAction<actionTypes.GetExampleTextArgs>(actionTypes.TRIGGER_UPDATE_TEXT);
