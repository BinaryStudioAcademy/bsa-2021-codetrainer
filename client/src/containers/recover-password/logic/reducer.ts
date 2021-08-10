import * as actionTypes from './action-types';
import { initialState, IRecoverPassword } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

const recoverPassword = createReducer<IRecoverPassword>(initialState, {
	[actionTypes.RECOVER_PASSWORD_SUCCESS](state) {
		return {
			...state,
			isLoading: false,
			isSuccess: true,
		};
	},
	[actionTypes.RECOVER_PASSWORD_ERROR](state, action: actionTypes.TRecoverPasswordError) {
		return {
			...state,
			isLoading: false,
			errors: action.payload,
		};
	},
	[actionTypes.RECOVER_PASSWORD_STATE_RESET](state) {
		return {
			...state,
			isLoading: true,
			isSuccess: false,
			errors: null,
		};
	},
});

export default recoverPassword;
