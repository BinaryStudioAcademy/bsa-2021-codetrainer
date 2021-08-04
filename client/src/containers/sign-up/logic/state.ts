export interface ISignUpState {
	isLoading: boolean;
	isSuccess: boolean;
	error: string;
}

export const initialState: ISignUpState = {
	isLoading: false,
	isSuccess: false,
	error: '',
};
