import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';

interface IThemeSwitcher {}

export const ThemeSwitcher: React.FC<IThemeSwitcher> = () => {
	const changeTheme = () => {
		const theme = localStorage.getItem('theme');
		switch (theme) {
			case 'light':
				localStorage.setItem('theme', 'dark');
				break;
			case 'dark':
				localStorage.setItem('theme', 'light');
				break;
			default:
				break;
		}
	};
	return (
		<div>
			<FontAwesomeIcon size="lg" icon={faAdjust} onClick={() => changeTheme()} />
		</div>
	);
};

export default ThemeSwitcher;
