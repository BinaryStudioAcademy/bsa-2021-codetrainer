import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faExchangeAlt, faTrophy, faUsers } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/images/logo.svg';
import styles from './main-sidebar.module.scss';
import { ROUTES } from 'constants/routes';

const MainSidebar: React.FC = () => {
	return (
		<aside className={styles.mainSidebar}>
			<div className={styles.logotype}>
				<NavLink to={ROUTES.Home}>
					<img src={logo} alt="" className={styles.logotypeImage} />
				</NavLink>
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
						<NavLink to={ROUTES.createTask} className={styles.navigationLink}>
							<FontAwesomeIcon icon={faExchangeAlt} className={styles.navigationIcon} />
							Challenge
						</NavLink>
					</li>
					<li className={styles.navigationItem}>
						<NavLink to={ROUTES.Clans} className={styles.navigationLink}>
							<FontAwesomeIcon icon={faUsers} className={styles.navigationIcon} />
							Clans
						</NavLink>
					</li>
					<li className={styles.navigationItem}>
						<NavLink to={ROUTES.LeaderBoard} className={styles.navigationLink}>
							<FontAwesomeIcon icon={faTrophy} className={styles.navigationIcon} />
							Leaders
						</NavLink>
					</li>
				</ul>
			</nav>
		</aside>
	);
};

export default MainSidebar;
