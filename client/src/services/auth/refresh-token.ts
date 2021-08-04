import jwtDecode from 'jwt-decode';
import { LocalStorageKeys } from 'constants/local-storage-keys';

interface IToken {
	begin: number;
	expTime: number;
}

export class RefreshToken {
	static REFRESH_TOKEN: IToken | null = null;
	static BEARER = '';
	static isTimeAccessTokenExpired() {
		if (!RefreshToken.REFRESH_TOKEN) {
			return true;
		}
		const now = Date.now() - 10000;
		return RefreshToken.REFRESH_TOKEN.begin + RefreshToken.REFRESH_TOKEN.expTime <= now;
	}

	static hasRefreshToken() {
		return Boolean(localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN));
	}

	static setToken(token: string) {
		RefreshToken.BEARER = `Bearer ${token}`;
		localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN, 'true');
		const { exp, iat }: { exp: number; iat: number } = jwtDecode(token);
		RefreshToken.REFRESH_TOKEN = {
			begin: Date.now(),
			expTime: (exp - iat) * 1000,
		};
	}

	static getBearer() {
		return RefreshToken.BEARER;
	}

	static resetToken() {
		RefreshToken.BEARER = '';
		RefreshToken.REFRESH_TOKEN = null;
		localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN);
	}
}
