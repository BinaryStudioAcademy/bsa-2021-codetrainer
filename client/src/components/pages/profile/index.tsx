import React from 'react';
import styles from './profile.module.scss';
import { ProfileBio } from './profile-bio';
import { IProfileInfoProps, ProfileInfo } from './profile-info';
import { IUser } from 'typings/common/IUser';

interface IProfileProps {
	error: string | null;
	userInfo: IUser | null;
	currentUser: IUser | null;
	profileInfoProps: IProfileInfoProps;
	followHandler: (id: string) => void;
	unfollowHandler: (id: string) => void;
}

export const Profile = ({
	userInfo,
	error,
	profileInfoProps,
	currentUser,
	followHandler,
	unfollowHandler,
}: IProfileProps) => {
	return (
		<div className={styles.profile}>
			{error ? (
				<div className={styles.error}>{error}</div>
			) : (
				userInfo && (
					<>
						<ProfileBio
							user={userInfo}
							currentUser={currentUser}
							followHandler={followHandler}
							unfollowHandler={unfollowHandler}
						/>
						<ProfileInfo {...profileInfoProps} />
					</>
				)
			)}
		</div>
	);
};
