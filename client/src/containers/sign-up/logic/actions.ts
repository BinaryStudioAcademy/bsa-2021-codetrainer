import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const signUpUser = createAction<actionTypes.TSignUpArgs>(actionTypes.SIGN_UP_USER);
// export const getExampleText = createAction<actionTypes.TGetExampleTextArgs>(actionTypes.TRIGGER_UPDATE_TEXT);
