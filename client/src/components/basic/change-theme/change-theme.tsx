import React from 'react';
import WbSunnySharpIcon from '@material-ui/icons/WbSunnySharp';
import styles from './change-theme.module.scss';

interface IChangeThemeProps {}

export const ChangeTheme = (props: IChangeThemeProps) => {
	return (
		<div className={styles.changeScheme}>
			<WbSunnySharpIcon />
		</div>
	);
};
