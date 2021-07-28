import React from 'react';
import styles from './spinner.module.scss';

const Spinner: React.FC<{ isBig: boolean }> = ({ isBig }) => {
	return <div className={`${styles.spinner} ${styles[`spinner${isBig ? 'Big' : 'Small'}`]}`}></div>;
};

export default Spinner;
