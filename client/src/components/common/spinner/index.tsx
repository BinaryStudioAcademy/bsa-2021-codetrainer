import React from 'react';
import { ISpinnerProps } from './types';
import styles from './spinner.module.scss';

const Spinner: React.FC<ISpinnerProps> = ({ size = '50px' }) => {
	const spinnerSize = (value: string) => ({ height: value, width: value });

	return <div className={styles.spinner} style={spinnerSize(size)} />;
};

export default Spinner;
