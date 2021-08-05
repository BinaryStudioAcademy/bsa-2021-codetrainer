import { exampleReducer } from 'containers/example/logic/reducer';
import { profileReducer } from 'containers/profile/logic/reducer';
import { clansReducer } from 'containers/clans/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { IRootState } from 'typings/root-state';

const rootReducer: Reducer<IRootState> = combineReducers({
	example: exampleReducer,
	profile: profileReducer,
	clans: clansReducer,
});

export default rootReducer;
