import React from 'react';
import styles from './page-container.module.scss';

const PageContainer: React.FC = ({ children }) => {
	return (
		<div className={styles.pageContainer}>{children}</div>
	);
};

export default PageContainer;
