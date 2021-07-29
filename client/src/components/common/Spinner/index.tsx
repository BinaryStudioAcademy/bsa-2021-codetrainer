import React from 'react';
import styles from './spinner.module.scss';

const Spinner: React.FC<{ size: string }> = ({ size }) => {
	const spinnerSize = (value: string) => {
		return { height: value, width: value };
	};

	return <div className={styles.spinner} style={spinnerSize(size)}></div>;
};

export default Spinner;
