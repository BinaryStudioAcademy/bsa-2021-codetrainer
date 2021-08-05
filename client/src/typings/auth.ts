import { ISignInState } from 'containers/sign-in/logic/state';
import { ISignUpState } from 'containers/sign-up/logic/state';
import { IUserState } from 'containers/user/logic/state';

export interface IAuthState {
	user: IUserState;
	signIn: ISignInState;
	signUp: ISignUpState;
}
