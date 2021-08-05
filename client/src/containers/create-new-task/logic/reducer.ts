import { initialState, ICreateTaskState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';
import * as actionTypes from './action-types';

export const createTaskReducer = createReducer<ICreateTaskState>(initialState, {
	[actionTypes.SET_DISCIPLINE](state, action: actionTypes.TSetDisciplineArgs) {
		return {
			...state,
			discipline: action.discipline,
		};
	},
	[actionTypes.SET_SWITCH](state, action: actionTypes.TSetSwitchArgs) {
		return {
			...state,
			isSelectedSwitch: action.isSelectedSwitch,
		};
	},
});
