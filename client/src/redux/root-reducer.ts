import { exampleReducer } from 'containers/example/logic/reducer';
import { profileReducer } from 'containers/profile/logic/reducer';
import { authReducer } from 'containers/routing/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { IRootState } from 'typings/root-state';

const rootReducer: Reducer<IRootState> = combineReducers({
	profile: profileReducer,
	example: exampleReducer,
	auth: authReducer,
});

export default rootReducer;
