import { IExampleState } from 'containers/example/logic/state';
import { ISignInState } from 'containers/sign-in/logic/state';
import { ISignUpState } from 'containers/sign-up/logic/state';

export interface IRootState {
	example: IExampleState;
	signIn: ISignInState;
	signUp: ISignUpState;
}
