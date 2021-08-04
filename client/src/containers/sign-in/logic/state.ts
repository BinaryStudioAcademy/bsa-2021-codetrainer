import { IUser } from 'typings/sign-in-form';

export interface ISignInState {
	user: IUser | null;
	isLoading: boolean;
	isSuccess: boolean;
	error: string;
}

export const initialState: ISignInState = {
	user: null,
	isLoading: false,
	isSuccess: false,
	error: '',
};
