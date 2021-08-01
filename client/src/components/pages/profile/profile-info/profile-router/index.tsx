import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Menu, MenuItem } from '@blueprintjs/core';
import styles from './profile-router.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';
import * as actions from '../../../../../containers/profile/logic/actions';
const ProfileRouter: React.FC = () => {
	const match = useRouteMatch();
	const activeTab = useSelector((state: IRootState) => state.profile.activeTab);
	const dispatch = useDispatch();
	const setTabToActive = (tab: string) => {
		dispatch(actions.setActiveTab({ activeTab: tab }));
	};
	return (
		<Menu className={styles.navmenu}>
			<MenuItem
				className={activeTab === 'stats' ? `${styles.navmenuItem} ${styles.active}` : `${styles.navmenuItem}`}
				text="Stats"
				onClick={(e) => {
					window.history.replaceState({}, document.title, match.url + '/social');
					setTabToActive('stats');
				}}
			/>
			<MenuItem
				className={
					activeTab === 'challenge' ? `${styles.navmenuItem} ${styles.active}` : `${styles.navmenuItem}`
				}
				text="Challenge"
				onClick={(e) => {
					window.history.replaceState({}, document.title, match.url + '/social');
					setTabToActive('challenge');
				}}
			/>
			<MenuItem
				className={
					activeTab === 'solution' ? `${styles.navmenuItem} ${styles.active}` : `${styles.navmenuItem}`
				}
				text="Solution"
				onClick={(e) => {
					window.history.replaceState({}, document.title, match.url + '/social');
					setTabToActive('solution');
				}}
			/>
			<MenuItem
				className={activeTab === 'social' ? `${styles.navmenuItem} ${styles.active}` : `${styles.navmenuItem}`}
				text="Social"
				onClick={(e) => {
					window.history.replaceState({}, document.title, match.url + '/social');
					setTabToActive('social');
				}}
			/>
			<MenuItem
				href={match.url + '/collections'}
				className={
					activeTab === 'collections' ? `${styles.navmenuItem} ${styles.active}` : `${styles.navmenuItem}`
				}
				text="Collections"
				onClick={(e) => {
					e.preventDefault();
					setTabToActive('collections');
				}}
			/>
		</Menu>
	);
};
export default ProfileRouter;
