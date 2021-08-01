import React from 'react';
import styles from './profile.module.scss';
import { IProfileBioProps, ProfileBio } from './profile-bio';
import { ProfileInfo } from './profile-info';

interface IProfileProps {
	userInfo: IProfileBioProps;
	activeTab: string;
	tabContent: React.ReactElement | null;
}

export const Profile: React.FC<IProfileProps> = (props) => {
	return (
		<div className={styles.profile}>
			<ProfileBio {...props.userInfo} />
			<ProfileInfo activeTab={props.activeTab} tabContent={props.tabContent} />
		</div>
	);
};
