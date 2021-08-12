export interface IRecoverPassword {
	isLoading: boolean;
	errors: Record<string, { msg: string }[]> | string | null;
	isSuccess: boolean;
}

export const initialState: IRecoverPassword = {
	isLoading: false,
	errors: null,
	isSuccess: false,
};
