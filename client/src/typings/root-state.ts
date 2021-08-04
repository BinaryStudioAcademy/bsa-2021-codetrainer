import { IExampleState } from 'containers/example/logic/state';
import { ISignUpState } from 'containers/sign-up/logic/state';

export interface IRootState {
	example: IExampleState;
	signUp: ISignUpState;
}
