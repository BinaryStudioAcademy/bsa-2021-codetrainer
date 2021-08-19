import React from 'react';
import styles from './profile.module.scss';
import { ProfileBio } from './profile-bio';
import { IProfileInfoProps, ProfileInfo } from './profile-info';
import { IUser } from 'typings/common/IUser';

interface IProfileProps {
	error: string | null;
	userInfo: IUser | null;
	profileInfoProps: IProfileInfoProps;
}

export const Profile = ({ userInfo, error, profileInfoProps }: IProfileProps) => {
	return (
		<div className={styles.profile}>
			{error ? <div className={styles.error}>{error}</div>
				: userInfo && (
					<>
						<ProfileBio {...userInfo} />
						<ProfileInfo {...profileInfoProps} />
					</>)}
		</div>
	);
};
