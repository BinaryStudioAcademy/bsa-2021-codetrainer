import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Menu, MenuItem } from '@blueprintjs/core';
import styles from './profile-router.module.scss';
import clsx from 'clsx';

interface IProfileRouterProps {
	activeTab: string;
}

const ProfileRouter: React.FC<IProfileRouterProps> = (props) => {
	const match = useRouteMatch();
	const activeTab = props.activeTab;
	console.log(activeTab);
	return (
		<Menu className={styles.navmenu}>
			<MenuItem
				className={clsx(`${styles.navmenuItem}`, activeTab === 'stats' && `${styles.active}`)}
				text="Stats"
				onClick={(e) => {
					window.history.replaceState({}, document.title, match.url + '/stats');
				}}
			/>
			<MenuItem
				className={clsx(`${styles.navmenuItem}`, activeTab === 'challenge' && `${styles.active}`)}
				text="Challenge"
				onClick={(e) => {
					window.history.replaceState({}, document.title, match.url + '/challenge');
				}}
			/>
			<MenuItem
				className={clsx(`${styles.navmenuItem}`, activeTab === 'solution' && `${styles.active}`)}
				text="Solution"
				onClick={(e) => {
					window.history.replaceState({}, document.title, match.url + '/solution');
				}}
			/>
			<MenuItem
				className={clsx(`${styles.navmenuItem}`, activeTab === 'social' && `${styles.active}`)}
				text="Social"
				onClick={(e) => {
					window.history.replaceState({}, document.title, match.url + '/social');
				}}
			/>
			<MenuItem
				className={clsx(`${styles.navmenuItem}`, activeTab === 'collections' && `${styles.active}`)}
				text="Collections"
				onClick={(e) => {
					window.history.replaceState({}, document.title, match.url + '/collections');
				}}
			/>
		</Menu>
	);
};
export default ProfileRouter;
