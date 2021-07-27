import * as actionTypes from './actionTypes';
import { ExampleState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const exampleReducer = createReducer<ExampleState>(initialState, {
	[actionTypes.UPDATE](state, action: actionTypes.UpdateExampleArgs) {
		return {
			...state,
			...action.partialState,
		};
	},
});
