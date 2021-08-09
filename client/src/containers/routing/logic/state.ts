export enum AuthAccessToken {
	LOADING = 'loading',
	LOADED = 'loaded',
}

export interface IAuthState {
	user: Record<string, string> | null;
	accessToken: AuthAccessToken;
}

export const initialState: IAuthState = {
	user: null,
	accessToken: AuthAccessToken.LOADING,
};
