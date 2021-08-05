import { signUpReducer } from 'containers/sign-up/logic/reducer';
import { signInReducer } from 'containers/sign-in/logic/reducer';
import { userReducer } from 'containers/user/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { IAuthState } from 'typings/auth';

const authReducer: Reducer<IAuthState> = combineReducers({
	signUp: signUpReducer,
	signIn: signInReducer,
	user: userReducer,
});

export default authReducer;
