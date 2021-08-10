export interface ISignInForm {
	email: string;
	password: string;
}

export interface IUser {
	id: string;
	name: string;
	surname: string;
	email: string;
	clan?: string;
	profileClan?: string;
}
