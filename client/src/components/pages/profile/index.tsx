import React from 'react';
import styles from './profile.module.scss';
import { IProfileBioProps, ProfileBio } from './profile-bio';
import { IProfileInfoProps, ProfileInfo } from './profile-info';

interface IProfileProps {
	userInfo: IProfileBioProps;
	profileInfoProps: IProfileInfoProps;
}

export const Profile: React.FC<IProfileProps> = ({ userInfo, profileInfoProps }) => {
	return (
		<div className={styles.profile}>
			<ProfileBio {...userInfo} />
			<ProfileInfo {...profileInfoProps} />
		</div>
	);
};
