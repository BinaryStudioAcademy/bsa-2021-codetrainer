import React from 'react';
import logo from 'assets/images/logo.svg';
import styles from './landing-header.module.scss';
import { LandingNav as Nav } from './landing-nav/landing-nav';

interface ILandingHeaderProps {}
export const LandingHeader = (props: ILandingHeaderProps) => {
	return (
		<div className={styles.header}>
			<div className={styles.logotype}>
				<img src={logo} alt="" className={styles.logotypeImage} />
			</div>
			<Nav />
		</div>
	);
};
