import React from 'react';
import styles from './profile.module.scss';
import { ProfileBio } from './profile-bio';
import { IProfileInfoProps, ProfileInfo } from './profile-info';
import { IUser } from 'typings/common/IUser';

interface IProfileProps {
	userInfo: IUser;
	profileInfoProps: IProfileInfoProps;
}

export const Profile = ({ userInfo, profileInfoProps }: IProfileProps) => {
	return (
		<div className={styles.profile}>
			<ProfileBio {...userInfo} />
			<ProfileInfo {...profileInfoProps} />
		</div>
	);
};
