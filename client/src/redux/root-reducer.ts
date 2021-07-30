import { exampleReducer } from 'containers/example/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { RootState } from 'typings/root-state';

const rootReducer: Reducer<RootState> = combineReducers({
	example: exampleReducer,
});

export default rootReducer;
