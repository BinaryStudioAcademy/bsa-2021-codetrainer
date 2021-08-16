import React from 'react';
import styles from './page-container.module.scss';

const PageContainer: React.FC = ({ children }) => {
	return (
		<div className={styles.mainContent}>
			<div className={styles.pageContainer}>{children}</div>
		</div>
	);
};

export default PageContainer;
