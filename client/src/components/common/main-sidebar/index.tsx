import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import logo from '../../../assets/images/logo.svg';
import styles from './main-sidebar.module.scss';

const MainSidebar: React.FC = () => {
	return (
		<aside className={styles.mainSidebar}>
			<div className={styles.logotype}>
				<img src={logo} alt="" className={styles.logotypeImage} />
			</div>
			<nav className={styles.navigation}>
				<ul className={styles.navigationList}>
					<li className={styles.navigationItem}>
						<NavLink to="/" className={styles.navigationLink}>
							<HomeIcon className={styles.navigationIcon} />
							Home
						</NavLink>
					</li>
					<li className={styles.navigationItem}>
						<NavLink to="/" className={styles.navigationLink}>
							<SearchIcon className={styles.navigationIcon} />
							Search
						</NavLink>
					</li>
					<li className={styles.navigationItem}>
						<NavLink to="/" className={styles.navigationLink}>
							<SyncAltIcon className={styles.navigationIcon} />
							Challenge
						</NavLink>
					</li>
					<li className={styles.navigationItem}>
						<NavLink to="/" className={styles.navigationLink}>
							<StarBorderOutlinedIcon className={styles.navigationIcon} />
							Blog
						</NavLink>
					</li>
				</ul>
			</nav>
		</aside>
	);
};

export default MainSidebar;
