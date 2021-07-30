import * as actionTypes from './action-types';
import { ExampleState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const exampleReducer = createReducer<ExampleState>(initialState, {
	[actionTypes.UPDATE](state, action: actionTypes.UpdateExampleArgs) {
		return {
			...state,
			...action.partialState,
		};
	},
});
