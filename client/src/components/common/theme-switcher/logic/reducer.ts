import { initialState, IThemeState } from './state';
import { createReducer } from '../../../../helpers/create-reducer.helper';
import * as actionTypes from './action-types';

export const themeReducer = createReducer<IThemeState>(initialState, {
	[actionTypes.SET_THEME](state, action: actionTypes.TSetThemeArgs) {
		return {
			...state,
			theme: action.theme,
		};
	},
});
