import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faExchangeAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/images/logo.svg';
import styles from './main-sidebar.module.scss';
import { ROUTES } from 'constants/routes';

const MainSidebar: React.FC = () => {
	return (
		<aside className={styles.mainSidebar}>
			<div className={styles.logotype}>
				<img src={logo} alt="" className={styles.logotypeImage} />
			</div>
			<nav className={styles.navigation}>
				<ul className={styles.navigationList}>
					<li className={styles.navigationItem}>
						<NavLink to={ROUTES.Home} className={styles.navigationLink}>
							<FontAwesomeIcon icon={faHome} className={styles.navigationIcon} />
							Home
						</NavLink>
					</li>
					<li className={styles.navigationItem}>
						<NavLink to={ROUTES.Search} className={styles.navigationLink}>
							<FontAwesomeIcon icon={faSearch} className={styles.navigationIcon} />
							Search
						</NavLink>
					</li>
					<li className={styles.navigationItem}>
						<NavLink to="/" className={styles.navigationLink}>
							<FontAwesomeIcon icon={faExchangeAlt} className={styles.navigationIcon} />
							Challenge
						</NavLink>
					</li>
					<li className={styles.navigationItem}>
						<NavLink to="/" className={styles.navigationLink}>
							<FontAwesomeIcon icon={faStar} className={styles.navigationIcon} />
							Blog
						</NavLink>
					</li>
				</ul>
			</nav>
		</aside>
	);
};

export default MainSidebar;
