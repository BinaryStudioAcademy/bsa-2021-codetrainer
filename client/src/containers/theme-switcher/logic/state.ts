import { ThemeType } from './models';

export interface IThemeState {
	theme: ThemeType;
}

export const initialState: IThemeState = {
	theme: (localStorage.getItem('theme') as ThemeType) || ThemeType.Light,
};
