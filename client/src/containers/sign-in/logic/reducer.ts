import * as actionTypes from './action-types';
import { ISignInState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const signInReducer = createReducer<ISignInState>(initialState, {
	[actionTypes.SIGN_IN_USER](state) {
		return {
			...state,
			isLoading: true,
		};
	},

	[actionTypes.SIGN_IN_USER_SUCCESS](state) {
		return {
			...state,
			isLoading: false,
			isSuccess: true,
			error: '',
		};
	},

	[actionTypes.SIGN_IN_USER_ERROR](_, action: { error: string }) {
		return {
			isLoading: false,
			isSuccess: false,
			error: action.error,
		};
	},

	[actionTypes.SIGN_IN_DATA_CLEAR]() {
		return initialState;
	},
});
