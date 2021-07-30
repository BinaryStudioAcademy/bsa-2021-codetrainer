import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const updateExample = createAction<actionTypes.TUpdateExampleArgs>(actionTypes.UPDATE);
export const getExampleText = createAction<actionTypes.TGetExampleTextArgs>(actionTypes.TRIGGER_UPDATE_TEXT);
