import { HttpMethods } from 'constants/services';
import { AuthApiPath } from 'enum';
import { ISignInForm } from 'typings/sign-in-form';
import { ISignUpForm } from 'typings/sign-up-form';
import { THttp } from '../http';
import { AccessToken } from './access-token';

export class Auth {
	private http: THttp;
	constructor({ http }: { http: THttp }) {
		this.http = http;
	}

	private load({ endpoint, body, skipAuthorization = true }: Omit<Helpers.IRequestArgs, 'method'>) {
		return this.http.callWebApi({
			method: HttpMethods.POST,
			endpoint,
			body,
			skipAuthorization,
		});
	}

	async login(body: ISignInForm) {
		const { user, token } = await this.load({ endpoint: AuthApiPath.LOGIN, body });
		AccessToken.setToken(token);
		return user;
	}

	async register(body: ISignUpForm) {
		const { user, token } = await this.load({ endpoint: AuthApiPath.REGISTER, body });
		AccessToken.setToken(token);
		return user;
	}

	async refreshToken() {
		try {
			const { user, token } = await this.load({ endpoint: AuthApiPath.REFRESH_TOKEN });
			AccessToken.setToken(token);
			return user;
		} catch (e) {
			AccessToken.resetToken();
			return null;
		}
	}

	async forgotPassword(body: Containers.IForgotPassword) {
		const { message } = await this.load({
			endpoint: AuthApiPath.FORGOT_PASSWORD,
			body,
		});
		return message;
	}

	async resetPassword(body: Containers.IResetPassword) {
		const { message } = await this.load({
			endpoint: AuthApiPath.RESET_PASSWORD,
			body,
		});
		return message;
	}

	async logout() {
		await this.load({ endpoint: AuthApiPath.LOGOUT, skipAuthorization: false });
		AccessToken.resetToken();
	}
}
