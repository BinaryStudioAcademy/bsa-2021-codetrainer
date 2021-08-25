import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navigation.module.scss';
import logo from 'assets/images/logo.svg';
import signInLogo from 'assets/icons/header/menu/logout.svg';

const Navigation = () => {
	return (
		<nav className={styles.navigation}>
			<div className={styles.navigationLogo}>
				<img src={logo} alt="" />
			</div>
			<div className={styles.navigationLinks}>
				<NavLink to="/sign-in" className={styles.navigationLink}>
					<img src={signInLogo} alt="" className={styles.navigationLinkLogo} />
					Sign in
				</NavLink>
			</div>
		</nav>
	);
};

export default Navigation;
