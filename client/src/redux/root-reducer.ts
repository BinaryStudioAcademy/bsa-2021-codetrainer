import { exampleReducer } from 'containers/example/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { IRootState } from 'typings/root-state';

const rootReducer: Reducer<IRootState> = combineReducers({
	example: exampleReducer,
});

export default rootReducer;
