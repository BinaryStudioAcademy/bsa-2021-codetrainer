import { HttpMethods } from 'constants/services';
import { AuthApiPath } from 'enum';
import { THttp } from '../http';
import { RefreshToken } from './refresh-token';

export class Auth {
	private http: THttp;
	constructor({ http }: { http: THttp }) {
		this.http = http;
	}

	private load({ endpoint, body, skipAuthorization = true }: Omit<Helpers.IRequestArgs, 'method'>) {
		return this.http.fetch({
			method: HttpMethods.POST,
			endpoint,
			body,
			skipAuthorization,
		});
	}

	async login(body: Record<string, string>) {
		const { user, token } = await this.load({ endpoint: AuthApiPath.LOGIN, body });
		RefreshToken.setToken(token);
		return user;
	}

	async register(body: Record<string, string>) {
		const { user, token } = await this.load({ endpoint: AuthApiPath.REGISTER, body });
		RefreshToken.setToken(token);
		return user;
	}

	async refreshToken() {
		try {
			const { user, token } = await this.load({ endpoint: AuthApiPath.REFRESH_TOKEN });
			RefreshToken.setToken(token);
			return user;
		} catch (e) {
			RefreshToken.resetToken();
			return null;
		}
	}

	async logout() {
		await this.load({ endpoint: AuthApiPath.LOGOUT });
		RefreshToken.resetToken();
	}
}
