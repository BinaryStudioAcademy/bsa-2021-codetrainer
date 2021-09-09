import * as actionTypes from './action-types';
import { IHomeState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const homeReducer = createReducer<IHomeState>(initialState, {
	[actionTypes.SET_TASK](state, action: actionTypes.TSetTask) {
		return {
			...state,
			state: {
				...state.state,
				nextTask: action.task,
			},
		};
	},

	[actionTypes.SET_MESSAGES](state, { messages, messagesCount }: actionTypes.TSetMessages) {
		return {
			...state,
			state: {
				...state.state,
				messages: [...state.state.messages, ...messages],
				messagesCount,
			},
		};
	},
	[actionTypes.SET_DATA_BEFORE_LOAD](state) {
		return {
			...state,
			state: {
				...state.state,
				messages: [],
				messagesCount: 0,
				page: 1,
			},
		};
	},

	[actionTypes.SET_PAGE](state, { page }: actionTypes.TSetPage) {
		return {
			...state,
			state: {
				...state.state,
				page,
			},
		};
	},

	[actionTypes.SET_ERRORS](state, { errors }: actionTypes.TSetErrors) {
		return {
			...state,
			errors,
		};
	},

	[actionTypes.SET_COMMUNITY](state, action: actionTypes.TSetCommunity) {
		return {
			...state,
			state: {
				...state.state,
				community: action.community,
			},
		};
	},
});
