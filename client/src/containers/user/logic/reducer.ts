import { IUser } from 'typings/common/IUser';
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
	[actionTypes.SET_USER_CLAN](state, action: actionTypes.TSetUserClan) {
		const newUserState = {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			...state.user!,
			clan: action.clan,
			profileClan: action.clan ? state.user?.profileClan : undefined,
		};
		const newState: IUserDataState = {
			...state,
			user: newUserState,
		};
		return newState;
	},
	[actionTypes.USER_ACCESS_TOKEN_LOADING](state, action: actionTypes.TUserAccessTokenLoading) {
		return {
			...state,
			accessToken: action.accessToken,
		};
	},
	[actionTypes.ADD_TASK](state, action: actionTypes.TUserAddTask) {
		const isInState = (state?.user?.tasks || []).find((task) => task.id === action.task.id);
		return !state.user || Boolean(isInState)
			? state
			: {
					...state,
					user: {
						...state.user,
						tasks: (state.user?.tasks || []).concat([action.task]),
					},
			  };
	},
	[actionTypes.DELETE_TASK](state, action: actionTypes.TUserDeleteTask) {
		const newTasks = state.user?.tasks?.filter((item) => item.id !== action.taskId);
		const userBody: IUser | null = state.user
			? {
					...state.user,
					tasks: newTasks,
			  }
			: null;
		const newState: IUserDataState = {
			accessToken: state.accessToken,
			user: userBody,
		};
		return newState;
	},
});

export default routingReducer;
