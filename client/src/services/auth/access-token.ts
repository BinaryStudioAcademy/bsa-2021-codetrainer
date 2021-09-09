import jwtDecode from 'jwt-decode';
import { LocalStorageKeys } from 'constants/local-storage-keys';

interface IExpires {
	begin: number;
	expTime: number;
}

export class AccessToken {
	static EXPIRES: IExpires | null = null;
	static TOKEN: string | null = null;
	static isTimeAccessTokenExpired() {
		if (!AccessToken.EXPIRES) {
			return true;
		}
		const now = Date.now() - 10000;
		return AccessToken.EXPIRES.begin + AccessToken.EXPIRES.expTime <= now;
	}

	static hasRefreshToken() {
		return Boolean(localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN));
	}

	static setToken(token: string) {
		localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN, 'true');
		const { exp, iat }: { exp: number; iat: number } = jwtDecode(token);
		AccessToken.EXPIRES = {
			begin: Date.now(),
			expTime: (exp - iat) * 1000,
		};
		AccessToken.TOKEN = token;
	}

	static get bearer() {
		const token = AccessToken.TOKEN;
		return token ? `Bearer ${token}` : '';
	}

	static get token() {
		return AccessToken.TOKEN || '';
	}

	static resetToken() {
		AccessToken.TOKEN = null;
		AccessToken.EXPIRES = null;
		localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN);
	}
}
