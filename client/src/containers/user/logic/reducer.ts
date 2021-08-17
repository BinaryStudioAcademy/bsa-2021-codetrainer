import * as actionTypes from './action-types';
import { initialState, IUserDataState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

const routingReducer = createReducer<IUserDataState>(initialState, {
	[actionTypes.SET_USER](state, action: actionTypes.TSetUser) {
		return {
			...state,
			user: action.user,
		};
	},
	[actionTypes.USER_ACCESS_TOKEN_LOADING](state, action: actionTypes.TUserAccessTokenLoading) {
		return {
			...state,
			accessToken: action.accessToken,
		};
	},
	[actionTypes.UPDATE_USER_NOTIFICATION](state, action: actionTypes.TRequestFailed) {
		return {
			...state,
			requestError: {
				error: action.error,
				message: action.message,
			},
		};
	},
	[actionTypes.CLEAR_USER_NOTIFICATION](state) {
		return {
			...state,
			requestError: undefined,
		};
	},
});

export default routingReducer;
