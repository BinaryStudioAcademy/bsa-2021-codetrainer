import React from 'react';
import Container from '../../common/container';
import Navigation from './navigation';
import styles from './header.module.scss';

const Header = () => {
	return (
		<header className={styles.header}>
			<Navigation />

			<Container className={styles.headerContainer}>
				<div className={styles.headerDescription}>
					<h1 className={styles.headerTitle}>Achive mastery through challenge</h1>
					<p className={styles.headerText}>
						Improve your skills by training with others on real code challenges
					</p>
					<button className={styles.headerButton}>Sign up</button>
				</div>
			</Container>
		</header>
	);
};

export default Header;
