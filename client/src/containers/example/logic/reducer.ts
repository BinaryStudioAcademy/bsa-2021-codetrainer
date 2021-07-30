import * as actionTypes from './action-types';
import { IExampleState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const exampleReducer = createReducer<IExampleState>(initialState, {
	[actionTypes.UPDATE](state, action: actionTypes.TUpdateExampleArgs) {
		return {
			...state,
			...action.partialState,
		};
	},
});
