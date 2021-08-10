import React from 'react';
import logo from 'assets/images/logo.svg';
import styles from './landing-header.module.scss';
import { LandingNav } from './landing-nav/landing-nav';

interface ILandingHeaderProps {}
export const LandingHeader = (props: ILandingHeaderProps) => {
	return (
		<div className={styles.header}>
			<div className={styles.logotype}>
				<img src={logo} alt="Codetrainer" className={styles.logotypeImage} />
			</div>
			<LandingNav />
		</div>
	);
};
