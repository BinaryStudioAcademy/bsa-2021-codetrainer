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
	[actionTypes.ADD_TASK](state, action: actionTypes.TUserAddTask) {
		return {
			...state,
			tasks: state.user?.tasks?.concat(action.task)
		};
	},
});

export default routingReducer;
