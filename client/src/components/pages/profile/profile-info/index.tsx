import React from 'react';
import ProfileRouter from './profile-router';
// import { Stats } from './tabs/stats';
import styles from './profile-info.module.scss';
import { useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';

interface IProfileInfoProps {
	tabContent: any;
	activeTab: string;
}

export const ProfileInfo: React.FC<IProfileInfoProps> = (props) => {
	const activeTab = useSelector((state: IRootState) => state.profile.activeTab);
	// const activeTab = props.activeTab;
	return (
		<div className={styles.profileInfo}>
			<ProfileRouter />
			{activeTab === 'stats'
				? props.tabContent()
				: activeTab === 'challenge'
				? null
				: activeTab === 'solution'
				? null
				: activeTab === 'social'
				? null
				: activeTab === 'collections'
				? null
				: null}
		</div>
	);
};
