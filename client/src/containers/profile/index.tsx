import { ProfilePage } from '../../components';
import React from 'react';
import { Stats } from './tabs/stats';

const mockProfileBioProps = {
	img: 'https://hyperhost.ua/info/storage/avatars/user-ava.png',
	name: 'name',
	nickname: 'nickname',
	clan: 'clan',
	memberSince: '14 jul',
	lastSeen: '13 sep',
	gitHub: 'github link',
	followingQuantity: 0,
	followersQuantity: 0,
	communityQuantity: 3,
};
export const Profile: React.FC = () => {
	const userInfoData = mockProfileBioProps;
	const activeTab = 'stats';

	return (
		<ProfilePage // this profile page is component
			userInfo={userInfoData}
			activeTab={activeTab}
			tabContent={
				Stats
				// Here you need to return Container, not component.
				// In this container you should have Routing for different tabs
			}
		/>
	);
};

export {};
