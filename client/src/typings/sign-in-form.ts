export interface ISignInForm {
	email: string;
	password: string;
}

export interface IUser {
	id: string;
	username: string;
	name: string;
	surname: string;
	email: string;
	clan?: string;
	profileClan?: string;
}
