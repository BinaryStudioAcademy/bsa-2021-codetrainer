import jwtDecode from 'jwt-decode';
import { LocalStorageKeys } from 'constants/local-storage-keys';

interface IToken {
	begin: number;
	expTime: number;
}

export class AccessToken {
	static TOKEN: IToken | null = null;
	static BEARER = '';
	static isTimeAccessTokenExpired() {
		if (!AccessToken.TOKEN) {
			return true;
		}
		const now = Date.now() - 10000;
		return AccessToken.TOKEN.begin + AccessToken.TOKEN.expTime <= now;
	}

	static hasRefreshToken() {
		return Boolean(localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN));
	}

	static setToken(token: string) {
		AccessToken.BEARER = `Bearer ${token}`;
		localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN, 'true');
		const { exp, iat }: { exp: number; iat: number } = jwtDecode(token);
		AccessToken.TOKEN = {
			begin: Date.now(),
			expTime: (exp - iat) * 1000,
		};
	}

	static getBearer() {
		return AccessToken.BEARER;
	}

	static resetToken() {
		AccessToken.BEARER = '';
		AccessToken.TOKEN = null;
		localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN);
	}
}
