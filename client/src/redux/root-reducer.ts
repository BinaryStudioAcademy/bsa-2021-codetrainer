import { exampleReducer } from 'containers/example/logic/reducer';
import { authReducer } from 'containers/routing/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { IRootState } from 'typings/root-state';

const rootReducer: Reducer<IRootState> = combineReducers({
	example: exampleReducer,
	auth: authReducer,
});

export default rootReducer;
