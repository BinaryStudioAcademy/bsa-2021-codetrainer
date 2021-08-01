import React from 'react';
import styles from './profile.module.scss';
import { IProfileBioProps, ProfileBio } from './profile-bio';
import { ProfileInfo } from './profile-info';

interface IProfileProps {
	userInfo: IProfileBioProps;
	activeTab: string;
	tabContent: () => JSX.Element | null;
	setActiveTab: (tab: string) => void;
}

export const Profile: React.FC<IProfileProps> = (props) => {
	const { userInfo, ...profileInfo } = props;

	return (
		<div className={styles.profile}>
			<ProfileBio {...userInfo} />
			<ProfileInfo {...profileInfo} />
		</div>
	);
};
