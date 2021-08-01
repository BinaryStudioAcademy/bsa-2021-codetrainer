import React from 'react';
import { ProfileRouter } from './profile-router';
import styles from './profile-info.module.scss';

interface IProfileInfoProps {
	tabContent: any;
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

export const ProfileInfo: React.FC<IProfileInfoProps> = (props) => {
	return (
		<div className={styles.profileInfo}>
			<ProfileRouter activeTab={props.activeTab} setActiveTab={props.setActiveTab} />
			{props.tabContent()}
		</div>
	);
};
