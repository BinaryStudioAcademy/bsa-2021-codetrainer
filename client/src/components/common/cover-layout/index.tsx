import React from 'react';
import logo from 'assets/icons/logo.svg';
import background from 'assets/icons/cover-background.svg';
import styles from './cover.module.scss';

const CoverLayout: React.FC = ({ children }) => {
	return (
		<div className={styles.cover}>
			<div className={styles.coverImage}>
				<img className={styles.coverBackground} src={background} alt="Working proccess" />
				<img className={styles.coverLogo} src={logo} alt="Codetrainer" />
			</div>
			<main className={styles.main}>{children}</main>
		</div>
	);
};

export default CoverLayout;
