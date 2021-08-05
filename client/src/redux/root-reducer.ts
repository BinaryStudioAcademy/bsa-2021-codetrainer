import { exampleReducer } from 'containers/example/logic/reducer';
import { profileReducer } from 'containers/profile/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { IRootState } from 'typings/root-state';
import authReducer from 'containers/auth/logic/reducer';

const rootReducer: Reducer<IRootState> = combineReducers({
	auth: authReducer,
	example: exampleReducer,
	profile: profileReducer,
});

export default rootReducer;
