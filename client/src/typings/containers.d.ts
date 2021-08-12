declare namespace Containers {
	export interface IForgotPassword {
		email: string;
	}
	export interface IResetPassword {
		password: string;
		token: string;
	}
}
