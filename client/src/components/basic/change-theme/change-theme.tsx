import React from 'react';
import WbSunnySharpIcon from '@material-ui/icons/WbSunnySharp';
import styles from './change-theme.module.scss';

interface IChangeThemeProps {
	onClick: () => void;
}

export const ChangeTheme: React.FC<IChangeThemeProps> = ({ onClick }) => {
	return (
		<div className={styles.changeScheme} onClick={() => onClick()}>
			<WbSunnySharpIcon />
		</div>
	);
};
