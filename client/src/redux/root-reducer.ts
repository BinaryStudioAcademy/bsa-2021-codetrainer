import { exampleReducer } from 'containers/example/logic/reducer';
import { signUpReducer } from 'containers/sign-up/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { IRootState } from 'typings/root-state';
//@ts-ignore
const rootReducer: Reducer<IRootState> = combineReducers({
	example: exampleReducer,
	signUp: signUpReducer,
});

export default rootReducer;
