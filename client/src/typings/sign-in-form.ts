export interface ISignInForm {
	email: string;
	password: string;
}

export interface IUser {
	id: string;
	name: string;
	lastname: string;
	email: string;
	clan?: string;
	profileClan?: string;
}
