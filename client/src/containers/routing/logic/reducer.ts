import * as actionTypes from './action-types';
import { IAuthState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const authReducer = createReducer<IAuthState>(initialState, {
	[actionTypes.AUTH_USER](state, action: actionTypes.TAuthUser) {
		return {
			...state,
			user: action.user,
		};
	},
	[actionTypes.AUTH_ACCESS_TOKEN_LOADING](state, action: actionTypes.TAuthAccessTokenLoading) {
		return {
			...state,
			accessToken: action.accessToken,
		};
	},
});
