import React from 'react';
import styles from './spinner.module.scss';

interface ISpinnerProps {
	size?: string;
}

const Spinner: React.FC<ISpinnerProps> = ({ size = '50px' }) => {
	const spinnerSize = (value: string) => {
		return { height: value, width: value };
	};

	return <div className={styles.spinner} style={spinnerSize(size)} />;
};

export default Spinner;
