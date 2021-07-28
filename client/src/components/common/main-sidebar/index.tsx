import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faExchangeAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/images/logo.svg';
import styles from './main-sidebar.module.scss';

const MainSidebar: React.FC = () => {
	return (
		<aside className={styles['main-sidebar']}>
			<div className={styles.logotype}>
				<img src={logo} alt="" className={styles.logotype__image} />
			</div>
			<nav className={styles.navigation}>
				<ul className={styles.navigation__list}>
					<li className={styles.navigation__item}>
						<NavLink to="/" className={styles.navigation__link}>
							<FontAwesomeIcon icon={faHome} className={styles.navigation__icon} />
							Home
						</NavLink>
					</li>
					<li className={styles.navigation__item}>
						<NavLink to="/" className={styles.navigation__link}>
							<FontAwesomeIcon icon={faSearch} className={styles.navigation__icon} />
							Search
						</NavLink>
					</li>
					<li className={styles.navigation__item}>
						<NavLink to="/" className={styles.navigation__link}>
							<FontAwesomeIcon icon={faExchangeAlt} className={styles.navigation__icon} />
							Challenge
						</NavLink>
					</li>
					<li className={styles.navigation__item}>
						<NavLink to="/" className={styles.navigation__link}>
							<FontAwesomeIcon icon={faStar} className={styles.navigation__icon} />
							Blog
						</NavLink>
					</li>
				</ul>
			</nav>
		</aside>
	);
};

export default MainSidebar;
