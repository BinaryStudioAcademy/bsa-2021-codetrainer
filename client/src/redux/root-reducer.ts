import { exampleReducer } from 'containers/example/logic/reducer';
import { signUpReducer } from 'containers/sign-up/logic/reducer';
import { signInReducer } from 'containers/sign-in/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { IRootState } from 'typings/root-state';

const rootReducer: Reducer<IRootState> = combineReducers({
	example: exampleReducer,
	signUp: signUpReducer,
	signIn: signInReducer,
});

export default rootReducer;
