import React, { useMemo, useCallback } from 'react';
import { ProfilePage, ProfileTasks } from '../../components';
import { Stats } from './tabs/stats';
import { mockProfileBioProps, statsProps, profileTasks } from './mocks';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';
import * as actions from './logic/actions';
import { ActiveTabId } from './logic/models';
import { profilePageTabs } from './config';

export const Profile: React.FC = () => {
	const activeTabId = useSelector((state: IRootState) => state.profile.activeTab);
	const dispatch = useDispatch();
	const setActiveTab = useCallback(
		(tabId) => {
			dispatch(actions.setActiveTab({ activeTab: tabId }));
		},
		[dispatch],
	);

	const getTabContent = useCallback((): React.ReactNode => {
		switch (activeTabId) {
			case ActiveTabId.Stats:
				return <Stats statsInfo={statsProps} />;
			case ActiveTabId.Tasks:
				return <ProfileTasks profileTasks={profileTasks} />;
			default:
				return <div />;
		}
	}, [activeTabId]);

	const tabItems = useMemo(() => {
		return profilePageTabs.map((item) => {
			return {
				tabId: item.id,
				tabNameText: item.name,
				onClick: () => {
					setActiveTab(item.id);
				},
			};
		});
	}, [setActiveTab]);

	return (
		<ProfilePage
			userInfo={mockProfileBioProps}
			profileInfoProps={{
				getTabContent,
				profileRouteProps: {
					tabItems,
					activeTabId,
				},
			}}
		/>
	);
};
