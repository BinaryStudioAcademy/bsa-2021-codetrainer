import * as actionTypes from './action-types';
import { IUserState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';
import { IUser } from 'typings/sign-in-form';

export const userReducer = createReducer<IUserState>(initialState, {
	[actionTypes.SET_USER](_, action: { user: IUser }) {
		return {
			user: action.user,
		};
	},

	[actionTypes.CLEAR_USER]() {
		return initialState;
	},
});
