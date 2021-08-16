import { IGithubProfileWithEmail } from 'typings/common/IGithub';

export interface ISignUpState {
	github?: IGithubProfileWithEmail;
	isLoading: boolean;
	isSuccess: boolean;
	error: string;
}

export const initialState: ISignUpState = {
	isLoading: false,
	isSuccess: false,
	error: '',
};
