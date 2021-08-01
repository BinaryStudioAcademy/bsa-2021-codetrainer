import { ProfilePage } from '../../components';
import React from 'react';
import { Stats } from './tabs/stats';
import { mockProfileBioProps, statsProps } from './mocks';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';
import * as actions from './logic/actions';

export const Profile: React.FC = () => {
	const activeTab = useSelector((state: IRootState) => state.profile.activeTab);
	const tabContent = activeTab === 'stats' ? () => <Stats {...statsProps} /> : () => null;
	const dispatch = useDispatch();
	const setActiveTab = (tab: string) => {
		dispatch(actions.setActiveTab({ activeTab: tab }));
	};
	return (
		<ProfilePage
			userInfo={mockProfileBioProps}
			activeTab={activeTab}
			tabContent={tabContent}
			setActiveTab={setActiveTab}
		/>
	);
};
