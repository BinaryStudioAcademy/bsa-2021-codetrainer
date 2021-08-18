import React from 'react';
import { useDispatch } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from 'hooks/useAppSelector';
import { setTheme } from '../theme-switcher/logic/actions';
import { TSetThemeArgs } from '../theme-switcher/logic/action-types';
import { ThemeType } from '../theme-switcher/logic/models';

interface IThemeSwitcher {}

export const ThemeSwitcher: React.FC<IThemeSwitcher> = () => {
	// const changeTheme = () => {
	// 	const theme = localStorage.getItem('theme');
	// 	switch (theme) {
	// 		case 'light':
	// 			localStorage.setItem('theme', 'dark');
	// 			break;
	// 		case 'dark':
	// 			localStorage.setItem('theme', 'light');
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// };
	const dispatch = useDispatch();
	const onClickTheme = (name: TSetThemeArgs) => {
		dispatch(setTheme(name));
	};
	const theme = useAppSelector((rootState) => rootState.theme.theme);
	document.documentElement.setAttribute('data-theme', theme);
	return (
		<div>
			{/* <FontAwesomeIcon size="lg" icon={faAdjust} onClick={() => onClickTheme()} /> */}
			<button onClick={() => onClickTheme({ theme: ThemeType.Dark })}>DARK</button>
			<button onClick={() => onClickTheme({ theme: ThemeType.Light })}>LIGHT</button>
		</div>
	);
};

export default ThemeSwitcher;
