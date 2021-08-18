import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from 'hooks/useAppSelector';
import { setTheme } from '../theme-switcher/logic/actions';
import { ThemeType } from '../theme-switcher/logic/models';
import styles from './theme-switcher.module.scss';

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
			<FontAwesomeIcon size="lg" icon={faAdjust} onClick={() => onClickTheme()} />
		</div>
	);
};

export default ThemeSwitcher;
