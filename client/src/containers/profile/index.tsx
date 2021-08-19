import { ProfilePage } from '../../components';
import React, { useMemo, useCallback, useEffect } from 'react';
import { Stats, ProfileTasks, ProfileSocial } from './tabs';
import { statsProps } from './mocks';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';
import * as actions from './logic/actions';
import { ActiveTabId } from './logic/models';
import { profilePageTabs } from './config';
import {
	RouteComponentProps, useParams,
	// useParams
} from 'react-router-dom';
import { profileTasks } from './tabs/tasks/mocks';
import { social } from './tabs/social/mocks';
import { useAppSelector } from 'hooks/useAppSelector';
// import { useEffect } from 'react';

export const Profile = (props: RouteComponentProps) => {
	// const [userToDisplay, setUserToDisplay] = useState(null);
	const { activeTab: activeTabId } = useSelector((state: IRootState) => state.profile);
	const dispatch = useDispatch();
	const setActiveTab = useCallback(
		(tabId: ActiveTabId) => {
			dispatch(actions.setActiveTab({ activeTab: tabId }));
		},
		[dispatch],
	);

	const { user } = useAppSelector((state) => state.auth.userData);
	//@ts-ignore
	const { username } = useParams();


	useEffect(() => {

		debugger;
		dispatch(
			actions.searchFetchData({
				partialFilter: { username }
			}),
		);
	}, [username]);

	//@ts-ignore
	// const { username } = useParams();

	// useEffect(() => {
	// 	if (user?.username === username) {
	// 		setUserToDisplay(user);
	// 	}
	// 	else {

	// 	}

	// }, [username, user])

	const getTabContent = useCallback((): React.ReactNode => {
		switch (activeTabId) {
			case ActiveTabId.Stats:
				return <Stats statsInfo={statsProps} />;
			case ActiveTabId.Challenge:
				return <ProfileTasks profileTasks={profileTasks} />;
			case ActiveTabId.Social:
				return <ProfileSocial social={social} />;
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
					setActiveTab(item.id as ActiveTabId);
				},
			};
		});
	}, [setActiveTab]);

	// console.log(userToDisplay);

	return (
		user &&
		<ProfilePage
			userInfo={user}
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
