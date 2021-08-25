import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const setTheme = createAction<actionTypes.TSetThemeArgs>(actionTypes.SET_THEME);
