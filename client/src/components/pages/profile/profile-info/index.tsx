import React from 'react';
import { ProfileRouter } from './profile-router';
import styles from './profile-info.module.scss';

interface IProfileInfoProps {
	tabContent: any;
	activeTab: string;
}

export const ProfileInfo: React.FC<IProfileInfoProps> = (props) => {
	return (
		<div className={styles.profileInfo}>
			<ProfileRouter activeTab={props.activeTab} />
			{props.tabContent()}
		</div>
	);
};
