import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navigation.module.scss';

const Navigation = () => {
	return (
		<nav className={styles.navigation}>
			<div className={styles.navagationLogo}>
				<img src="assets/images/logo.svg" alt="" />
			</div>
			<div className={styles.navigationLinks}>
				<NavLink to="/sign-in" className={styles.navigationLink}>
					Sign in
				</NavLink>
			</div>
		</nav>
	);
};

export default Navigation;
