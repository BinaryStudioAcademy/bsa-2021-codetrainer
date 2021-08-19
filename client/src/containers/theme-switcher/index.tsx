import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'hooks/useAppSelector';
import { setTheme } from '../theme-switcher/logic/actions';
import { ThemeType } from '../theme-switcher/logic/models';
import styles from './theme-switcher.module.scss';
import { ChangeTheme } from 'components/basic/change-theme';

interface IThemeSwitcher {}

export const ThemeSwitcher: React.FC<IThemeSwitcher> = () => {
	const dispatch = useDispatch();
	const theme = useAppSelector((rootState) => rootState.theme.theme);
	const onClickTheme = () => {
		switch (theme) {
			case 'light':
				dispatch(setTheme({ theme: ThemeType.Dark }));
				localStorage.setItem('theme', 'dark');
				break;
			case 'dark':
				dispatch(setTheme({ theme: ThemeType.Light }));
				localStorage.setItem('theme', 'light');
				break;
		}
	};
	document.documentElement.setAttribute('data-theme', theme);
	return (
		<div className={styles.switch}>
			<ChangeTheme onClick={() => onClickTheme()} />
		</div>
	);
};

export default ThemeSwitcher;
