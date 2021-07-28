import React from 'react';
import styles from './scrollable.module.scss';

const Scrollable: React.FC = ({ children }) => {
	return <div className={styles.container}>{children}</div>;
};

export default Scrollable;
