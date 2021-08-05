import { exampleReducer } from 'containers/example/logic/reducer';
import { profileReducer } from 'containers/profile/logic/reducer';
import { createTaskReducer } from 'containers/create-new-task/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { IRootState } from 'typings/root-state';

const rootReducer = combineReducers<Reducer<IRootState>>({
	example: exampleReducer,
	profile: profileReducer,
	createTask: createTaskReducer,
});

export default rootReducer;
