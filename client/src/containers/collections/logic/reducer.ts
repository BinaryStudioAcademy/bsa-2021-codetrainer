import { ICollectionsState, initialState } from './state';
import * as actionTypes from './action-types';
import { createReducer } from 'helpers/create-reducer.helper';

const collectionsReducer = createReducer<ICollectionsState>(initialState, {
	[actionTypes.SET_COLLECTIONS](state, action: actionTypes.TSetCollections) {
		return {
			...state,
			collections: action.collections,
		};
	},
	[actionTypes.START_LOADING](state) {
		return {
			...state,
			isLoading: true,
		};
	},
	[actionTypes.END_LOADING](state) {
		return {
			...state,
			isLoading: false,
		};
	},
	[actionTypes.SET_SELECTED_TASK](state, action: actionTypes.TSetSelectedTask) {
		return {
			...state,
			selectedTask: action.taskId,
		};
	},
	[actionTypes.CLEAR_SELECTED_TASK](state) {
		return {
			...state,
			selectedTask: null,
		};
	},
});

export default collectionsReducer;
