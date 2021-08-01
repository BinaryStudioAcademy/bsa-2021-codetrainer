import React from 'react';
import styles from './profile.module.scss';
import { IProfileBioProps, ProfileBio } from './profile-bio';
import { ProfileInfo } from './profile-info';
// import { IStatsProps } from './profile-info/tabs/stats';
//
// const mockProfileBioProps = {
// 	img: 'https://hyperhost.ua/info/storage/avatars/user-ava.png',
// 	name: 'name',
// 	nickname: 'nickname',
// 	clan: 'clan',
// 	memberSince: '14 jul',
// 	lastSeen: '13 sep',
// 	gitHub: 'github link',
// 	followingQuantity: 0,
// 	followersQuantity: 0,
// 	communityQuantity: 3,
// };

interface IProfileProps {
	userInfo: IProfileBioProps;
	activeTab: string;
	tabContent: React.FC;
}

export const Profile: React.FC<IProfileProps> = (props) => {
	return (
		<div className={styles.profile}>
			<ProfileBio {...props.userInfo} />
			<ProfileInfo />
		</div>
	);
};
