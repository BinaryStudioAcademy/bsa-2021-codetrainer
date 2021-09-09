import { IUser } from 'typings/common/IUser';
import { mapUserResponseToUser } from 'helpers/user.helper';
import { HttpMethods } from 'constants/services';
import { AuthApiPath } from 'enum';
import { ISignInForm } from 'typings/sign-in-form';
import { ISignUpForm } from 'typings/sign-up-form';
import { THttp } from '../http';
import { AccessToken } from './access-token';
import { WebApi } from 'typings/webapi';
import { socket } from '../socket';

export class Auth {
	private http: THttp;
	constructor({ http }: { http: THttp }) {
		this.http = http;
	}

	protected load({ endpoint, body, query, skipAuthorization = true }: Omit<Helpers.IRequestArgs, 'method'>) {
		return this.http.callWebApi({
			method: HttpMethods.POST,
			endpoint,
			body,
			query,
			skipAuthorization,
		});
	}

	protected async authorize({ user, token }: { user: WebApi.Entities.IUser; token: string }): Promise<IUser> {
		AccessToken.setToken(token);
		socket.connect();
		return mapUserResponseToUser(user);
	}

	async login(body: ISignInForm) {
		return this.authorize(await this.load({ endpoint: AuthApiPath.LOGIN, body }));
	}

	async register(body: ISignUpForm) {
		return this.authorize(await this.load({ endpoint: AuthApiPath.REGISTER, body }));
	}

	async refreshToken() {
		try {
			return this.authorize(await this.load({ endpoint: AuthApiPath.REFRESH_TOKEN }));
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
