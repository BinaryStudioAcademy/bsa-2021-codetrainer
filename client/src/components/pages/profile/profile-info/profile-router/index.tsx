import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Menu, MenuItem } from '@blueprintjs/core';
import styles from './profile-router.module.scss';

const ProfileRouter: React.FC = () => {
	const match = useRouteMatch();

	return (
		<Menu className={styles.navmenu}>
			<MenuItem href={match.url + '/stats'} className={`${styles.navmenuItem} ${styles.active}`} text="Index" />
			<MenuItem href={match.url + '/stats'} className={styles.navmenuItem} text="Challenge" />
			<MenuItem href={match.url + '/stats'} className={styles.navmenuItem} text="Solution" />
			<MenuItem href={match.url + '/stats'} className={styles.navmenuItem} text="Social" />
			<MenuItem href={match.url + '/stats'} className={styles.navmenuItem} text="Collections" />
		</Menu>
	);
};
export default ProfileRouter;
