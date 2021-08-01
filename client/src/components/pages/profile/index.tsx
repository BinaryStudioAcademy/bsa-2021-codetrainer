import React from 'react';
import styles from './profile.module.scss';
import { ProfileBio } from './profile-bio';
import { ProfileInfo } from './profile-info';

const mockProfileBioProps = {
	img: 'https://hyperhost.ua/info/storage/avatars/user-ava.png',
	name: 'name',
	nickname: 'nickname',
	clan: 'clan',
	memberSince: '14 jul',
	lastSeen: '13 sep',
	gitHubUrl: 'github link',
	followingQuantity: 0,
	followersQuantity: 0,
	communityQuantity: 3,
};

export const Profile: React.FC = (props) => {
	return (
		<div className={styles.profile}>
			<ProfileBio {...mockProfileBioProps} />
			<ProfileInfo />
		</div>
	);
};
