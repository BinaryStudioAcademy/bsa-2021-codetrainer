import * as actionTypes from './action-types';
import { ISignUpState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';
import { ISignUpForm } from 'typings/sign-up-form';

export const signUpReducer = createReducer<ISignUpState>(initialState, {
	[actionTypes.SIGN_UP_USER](state, action: ISignUpForm) {
		debugger;
		return {
			...state,
			...action,
		};
	},

	[actionTypes.SIGN_UP_USER_SUCCESS](state) {
		debugger;
		return {
			...state,
			isSuccess: true,
		};
	},

	[actionTypes.SIGN_UP_USER_ERROR](state, action: { error: string }) {
		debugger;
		return {
			...state,
			action,
		};
	},
});
