import { IExampleState } from 'containers/example/logic/state';
import { ISignUpForm } from './sign-up-form';

export interface IRootState {
	example: IExampleState;
	auth: ISignUpForm;
}
