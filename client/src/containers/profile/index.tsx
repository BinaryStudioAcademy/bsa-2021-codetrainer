import { ProfilePage } from '../../components';
import React from 'react';
import { Stats } from './tabs/stats';
import { mockProfileBioProps, statsProps } from './mocks';

export const Profile: React.FC = () => {
	const activeTab = 'stats';
	const tabContent = activeTab === 'stats' ? () => <Stats {...statsProps} /> : null;

	return (
		<ProfilePage // this profile page is component
			userInfo={mockProfileBioProps}
			activeTab={activeTab}
			tabContent={tabContent}
			// Here you need to return Container, not component.
			// In this container you should have Routing for different tabs
		/>
	);
};
