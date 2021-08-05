import { HttpMethods } from 'constants/services';
import { AuthApiPath } from 'enum';
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

	async login(body: Record<string, string>) {
		const { user, token } = await this.load({ endpoint: AuthApiPath.LOGIN, body });
		AccessToken.setToken(token);
		return user;
	}

	async register(body: Record<string, string>) {
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

	async logout() {
		await this.load({ endpoint: AuthApiPath.LOGOUT, skipAuthorization: false });
		AccessToken.resetToken();
	}
}
