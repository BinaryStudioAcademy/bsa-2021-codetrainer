export interface IThemeState {
	theme: string;
}

export const initialState: IThemeState = {
	theme: localStorage.getItem('theme') || 'light',
};
