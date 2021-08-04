import React from 'react';
import background from 'assets/icons/cover-background.svg';
import logo from 'assets/icons/logo.svg';
import styles from './cover.module.scss';

const CoverLayout: React.FC = ({ children }) => {
	return (
		<div className={styles.cover}>
			<div className={styles.image}>
				<img className={styles.background} src={background} alt="" />
				<img className={styles.logo} src={logo} alt="codetrainer" />
			</div>
			<main className={styles.main}>{children}</main>
		</div>
	);
};

export default CoverLayout;
