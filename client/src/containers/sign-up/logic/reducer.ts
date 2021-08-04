import * as actionTypes from './action-types';
import { ISignUpState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';
import { ISignUpForm } from 'typings/sign-up-form';

export const signUpReducer = createReducer<ISignUpState>(initialState, {
	[actionTypes.SIGN_UP_USER](state) {
		return {
			...state,
			isLoading: true,
		};
	},

	[actionTypes.SIGN_UP_USER_SUCCESS](state, action: { user: ISignUpForm }) {
		return {
			...state,
			isLoading: false,
			isSuccess: true,
			user: action.user,
			error: '',
		};
	},

	[actionTypes.SIGN_UP_USER_ERROR](state, action: { error: string }) {
		return {
			...state,
			isLoading: false,
			isSuccess: false,
			error: action.error,
		};
	},
});
