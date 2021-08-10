import { ROUTES } from 'constants/routes';
import React from 'react';
import styles from './landing-nav.module.scss';

interface ILandingNavProps {}
export const LandingNav = (props: ILandingNavProps) => {
	return (
		<div className={styles.navBar}>
			<a href={ROUTES.SignUp}>Sign Up</a>
			<a href={ROUTES.SignIn}>Log In</a>
			<a href="#">For Educators</a>
			<a href="#">For Companies</a>
		</div>
	);
};
