import { ProfilePage } from '../../components';
import React from 'react';
import { Stats } from './tabs/stats';
import { mockProfileBioProps, statsProps } from './mocks';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';
import * as actions from './logic/actions';
import { useCallback } from 'react';
import { ActiveTabId } from './logic/models';
import { profilePageTabs } from './config';
import { useMemo } from 'react';

export const Profile: React.FC = () => {
	const activeTabId = useSelector((state: IRootState) => state.profile.activeTab);
	const getTabContent = useCallback((): React.ReactNode => {
		switch (activeTabId) {
			case ActiveTabId.Stats:
				return <Stats statsInfo={statsProps} />;
			default:
				return <div>Page is not finished yet</div>;
		}
	}, [activeTabId]);
	const dispatch = useDispatch();
	const setActiveTab = useCallback(
		(tabId: ActiveTabId) => {
			dispatch(actions.setActiveTab({ activeTab: tabId }));
		},
		[dispatch],
	);

	const tabItems = useMemo(() => {
		return profilePageTabs.map((item) => {
			return {
				tabid: item.id,
				tabNameText: item.name,
				onClick: () => setActiveTab(item.id),
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
