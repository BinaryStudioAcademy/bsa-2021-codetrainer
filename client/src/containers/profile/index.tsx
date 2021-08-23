import React, { useMemo, useCallback, useEffect } from 'react';
import { FullscreenLoader, ProfilePage } from 'components';
import { Stats, ProfileTasks, ProfileSocial, ProfileCollections } from './tabs';
import { statsProps } from './mocks';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';
import * as actions from './logic/actions';
import { ActiveTabId } from './logic/models';
import { profilePageTabs } from './config';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { profileTasks } from './tabs/tasks/mocks';
import { social } from './tabs/social/mocks';
import { useAppSelector, useUserSelector } from 'hooks/useAppSelector';
import { ProfileSolutions } from './tabs/solutions';

export const Profile = (props: RouteComponentProps) => {
	const { activeTab: activeTabId } = useSelector((state: IRootState) => state.profile);
	const dispatch = useDispatch();
	const setActiveTab = useCallback(
		(tabId: ActiveTabId) => {
			dispatch(actions.setActiveTab({ activeTab: tabId }));
		},
		[dispatch],
	);

	const { isLoading, error, userData } = useAppSelector((state) => state.profile);
	const visitor = useUserSelector();

	const { username } = useParams<{ username: string }>();

	useEffect(() => {
		dispatch(
			actions.searchUser({
				query: { username },
			}),
		);
	}, [username]);

	const getTabContent = useCallback((): React.ReactNode => {
		switch (activeTabId) {
			case ActiveTabId.Stats: {
				return <Stats statsInfo={statsProps} />;
			}
			case ActiveTabId.Challenge: {
				return <ProfileTasks profileTasks={profileTasks} />;
			}
			case ActiveTabId.Solution: {
				return <ProfileSolutions />;
			}
			case ActiveTabId.Social: {
				return <ProfileSocial social={social} />;
			}
			case ActiveTabId.Collections: {
				return <ProfileCollections userId={userData?.id as string} />;
			}
			default: {
				return <div />;
			}
		}
	}, [activeTabId]);

	const tabItems = useMemo(() => {
		return profilePageTabs
			.filter(({ tab }) => !tab.private || username === visitor?.username)
			.map((item) => {
				return {
					tabId: item.id,
					tabNameText: item.tab.name,
					onClick: () => {
						setActiveTab(item.id as ActiveTabId);
					},
				};
			});
	}, [setActiveTab, username, visitor]);

	return isLoading ? (
		<FullscreenLoader />
	) : (
		<ProfilePage
			error={error}
			userInfo={userData}
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
