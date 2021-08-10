import React from 'react';
import { ILabelProps } from './types';
import styles from './label.module.scss';

const Label: React.FC<ILabelProps> = ({ color, label }) => {
	const changebleStyles = {
		color: color,
		borderColor: color,
	};

	return (
		<div className={styles.label} style={changebleStyles}>
			{label}
		</div>
	);
};

export default Label;
