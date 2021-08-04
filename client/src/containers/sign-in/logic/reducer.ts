import * as actionTypes from './action-types';
import { ISignInState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';
import { ISignInForm } from 'typings/sign-in-form';

export const signInReducer = createReducer<ISignInState>(initialState, {
	[actionTypes.SIGN_IN_USER](state) {
		return {
			...state,
			isLoading: true,
		};
	},

	[actionTypes.SIGN_IN_USER_SUCCESS](_, action: { user: ISignInForm }) {
		return {
			user: action.user,
			isLoading: false,
			isSuccess: true,
			error: '',
		};
	},

	[actionTypes.SIGN_IN_USER_ERROR](_, action: { error: string }) {
		return {
			user: null,
			isLoading: false,
			isSuccess: false,
			error: action.error,
		};
	},
});
