export interface IRecoverPassword {
	onSubmit: (email: string) => void;
	errors: { msg: string }[] | null;
}
