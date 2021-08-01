import { ProfilePage } from '../../components';
import React from 'react';
import { Stats } from './tabs/stats';
import { useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';
import { mockProfileBioProps, statsProps } from './mocks';

export const Profile: React.FC = () => {
	const activeTab = useSelector((state: IRootState) => state.profile.activeTab);
	const tabContent = activeTab === 'stats' ? <Stats {...statsProps} /> : null;
	return <ProfilePage userInfo={mockProfileBioProps} activeTab={activeTab} tabContent={tabContent} />;
};

export {};
