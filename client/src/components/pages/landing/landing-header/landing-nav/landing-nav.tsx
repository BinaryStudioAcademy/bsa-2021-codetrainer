import React from 'react';
import styles from './landing-nav.module.scss';

interface ILandingNavProps {}
export const LandingNav = (props: ILandingNavProps) => {
	return (
		<div className={styles.navBar}>
			<a href="#">Sign Up</a>
			<a href="#">Log In</a>
			<a href="#">For Educators</a>
			<a href="#">For Companies</a>
		</div>
	);
};
