export interface ISignInState {
	isLoading: boolean;
	isSuccess: boolean;
	error: string;
}

export const initialState: ISignInState = {
	isLoading: false,
	isSuccess: false,
	error: '',
};
