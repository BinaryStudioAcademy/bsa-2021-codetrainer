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
	[actionTypes.USER_ACCESS_TOKEN_LOADING](state, action: actionTypes.TUserAccessTokenLoading) {
		return {
			...state,
			accessToken: action.accessToken,
		};
	},
	[actionTypes.ADD_TASK](state, action: actionTypes.TUserAddTask) {
		const userBody:IUser|null = state.user?{
			...state.user,
			tasks: state.user?.tasks?.concat(action.task)
		}:null;
		const newState: IUserDataState = {
			accessToken: state.accessToken,
			user: userBody
		}
		return newState
	},
	[actionTypes.DELETE_TASK](state, action: actionTypes.TUserDeleteTask) {
		const newTasks =  state.user?.tasks?.filter(item=>item.id!==action.task.id)
		const userBody:IUser|null = state.user?{
			...state.user,
			tasks: newTasks
		}:null
		const newState: IUserDataState = {
			accessToken: state.accessToken,
			user: userBody
		}
		return newState
	},
});

export default routingReducer;
