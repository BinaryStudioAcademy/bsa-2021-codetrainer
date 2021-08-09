import * as actionTypes from './action-types';
import { ISignUpState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const signUpReducer = createReducer<ISignUpState>(initialState, {
	[actionTypes.SIGN_UP_USER](state) {
		return {
			...state,
			isLoading: true,
		};
	},

	[actionTypes.SIGN_UP_USER_SUCCESS]() {
		return {
			isLoading: false,
			isSuccess: true,
			error: '',
		};
	},

	[actionTypes.SIGN_UP_USER_ERROR](_, action: { error: string }) {
		return {
			isLoading: false,
			isSuccess: false,
			error: action.error,
		};
	},
});
