import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Menu, MenuItem } from '@blueprintjs/core';
import styles from './profile-router.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';
import * as actions from 'containers/profile/logic/actions';
import clsx from 'clsx';

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
				className={clsx(`${styles.navmenuItem}`, activeTab === 'stats' && `${styles.active}`)}
				text="Stats"
				onClick={(e) => {
					window.history.replaceState({}, document.title, match.url + '/stats');
					setTabToActive('stats');
				}}
			/>
			<MenuItem
				className={clsx(`${styles.navmenuItem}`, activeTab === 'challenge' && `${styles.active}`)}
				text="Challenge"
				onClick={(e) => {
					window.history.replaceState({}, document.title, match.url + '/challenge');
					setTabToActive('challenge');
				}}
			/>
			<MenuItem
				className={clsx(`${styles.navmenuItem}`, activeTab === 'solution' && `${styles.active}`)}
				text="Solution"
				onClick={(e) => {
					window.history.replaceState({}, document.title, match.url + '/solution');
					setTabToActive('solution');
				}}
			/>
			<MenuItem
				className={clsx(`${styles.navmenuItem}`, activeTab === 'social' && `${styles.active}`)}
				text="Social"
				onClick={(e) => {
					window.history.replaceState({}, document.title, match.url + '/social');
					setTabToActive('social');
				}}
			/>
			<MenuItem
				className={clsx(`${styles.navmenuItem}`, activeTab === 'collections' && `${styles.active}`)}
				text="Collections"
				onClick={(e) => {
					window.history.replaceState({}, document.title, match.url + '/collections');
					setTabToActive('collections');
				}}
			/>
		</Menu>
	);
};
export default ProfileRouter;
