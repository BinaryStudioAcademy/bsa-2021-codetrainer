import { signUpReducer } from 'containers/sign-up/logic/reducer';
import { signInReducer } from 'containers/sign-in/logic/reducer';
import recoverPassword from 'containers/recover-password/logic/reducer';
import userData from 'containers/user/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { IAuthState } from './state';

export const authReducer: Reducer<IAuthState> = combineReducers({
	signUp: signUpReducer,
	signIn: signInReducer,
	userData,
	recoverPassword,
});
