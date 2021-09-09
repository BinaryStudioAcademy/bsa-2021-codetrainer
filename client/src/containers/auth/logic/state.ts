import { IRecoverPassword } from 'containers/recover-password/logic/state';
import { ISignInState } from 'containers/sign-in/logic/state';
import { ISignUpState } from 'containers/sign-up/logic/state';
import { IUserDataState } from 'containers/user/logic/state';

export interface IAuthState {
	signIn: ISignInState;
	signUp: ISignUpState;
	userData: IUserDataState;
	recoverPassword: IRecoverPassword;
}
