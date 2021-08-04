import { ISignUpForm } from 'typings/sign-up-form';

export interface ISignUpState {
	isLoading: boolean;
	isSuccess: boolean;
	error: string;
	user: ISignUpForm | null;
}

export const initialState: ISignUpState = {
	isLoading: false,
	isSuccess: false,
	error: '',
	user: null,
};
