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

	[actionTypes.SIGN_UP_USER_SUCCESS](state) {
		return {
			...state,
			isLoading: false,
			isSuccess: true,
			error: '',
			github: undefined,
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

	[actionTypes.SET_GITHUB](state, action: actionTypes.TSetGithubArgs) {
		return {
			...state,
			github: action.github,
		};
	},
});
