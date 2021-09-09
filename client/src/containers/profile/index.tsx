import React, { useMemo, useCallback, useEffect } from 'react';
import { FullscreenLoader, ProfilePage } from 'components';
import { Stats, ProfileTasks, ProfileSocial, ProfileCollections } from './tabs';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';
import * as actions from './logic/actions';
import { ActiveTabId } from './logic/models';
import { profilePageTabs } from './config';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { getNextRank, NextRankHonor } from 'enum/ranks';
import { useAppSelector, useUserSelector } from 'hooks/useAppSelector';
import { ProfileSolutions } from './tabs/solutions';
import { addNotification } from 'services/notifications/notifications.service';
import { v4 as uuid } from 'uuid';
import { NotificationTypes } from 'typings/common/INotification';
import { WebApi } from 'typings/webapi';
import { SolutionStatus } from 'typings/common/solution';

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
	const { user } = useAppSelector((state) => state.auth.userData);
	const visitor = useUserSelector();

	const { username } = useParams<{ username: string }>();

	useEffect(() => {
		dispatch(
			actions.searchUser({
				query: { username },
			}),
		);
	}, [username]);

	const mockPointsProps = {
		rank: userData?.rank ?? 9,
		honor: userData?.honor ?? 0,
		completedChallenge: (user?.solutions || []).filter((solution) => solution.status === SolutionStatus.COMPLETED)
			.length,
	};

	const mockLanguagesProps = {
		mostRecent: userData ? (userData.languages ? userData.languages[0].name : 'JS') : 'JS',
	};
	const getMaxTotal = (value: number) => {
		if (value === 0) {
			return 0;
		}
		if (value < 10) {
			return 10;
		} else if (value < 25) {
			return 25;
		} else if (value < 50) {
			return 50;
		} else if (value < 100) {
			return 100;
		} else {
			return 500;
		}
	};
	const mockHonorBreakdownProps = {
		completedChallengeDone: (user?.solutions || []).filter(
			(solution) => solution.status === SolutionStatus.COMPLETED,
		).length,
		completedChallengeTotal: user?.solutions?.length ?? 0,
		authoredChallengeDone: user?.tasks?.length ?? 0,
		authoredChallengeTotal: getMaxTotal(user?.tasks?.length ?? 0),
		commentsDone: user?.comments?.length ?? 0,
		commentsTotal: getMaxTotal(user?.comments?.length ?? 0),
	};

	const mockRankBreakDownProps = {
		rankProgress: Number((((user?.honor ?? 0) * 100) / NextRankHonor[getNextRank(user?.rank ?? 9)]).toFixed(1)),
		rank: user?.rank ?? 9,
	};

	const mockCommunityProps = {
		comments: user?.comments?.length ?? 0,
		collections: user?.collections?.length ?? 0,
	};

	const statsProps = {
		points: mockPointsProps,
		languages: mockLanguagesProps,
		honorBreakdown: mockHonorBreakdownProps,
		rankBreakdown: mockRankBreakDownProps,
		community: mockCommunityProps,
	};

	const publishedTasks = userData?.publishedTasks;
	const unpublishedTasks = userData?.unpublishedTasks;

	const profileTasks = [
		{
			title: 'Published',
			empty: "User doesn't have any published challenges yet.",
			id: 'published',
			tasks: publishedTasks,
		},
		{
			title: 'Not published',
			empty: "User doesn't have any created Beta challenges yet.",
			id: 'notPublished',
			tasks: unpublishedTasks,
		},
	];

	const followersSocial = userData?.followersSocial;
	const followingsSocial = userData?.followingsSocial;
	const comminitySocial = userData?.comminitySocial;

	const social = [
		{
			title: 'Followers',
			id: 'followers',
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			users: followersSocial!,
		},
		{
			title: 'Following',
			id: 'following',
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			users: followingsSocial!,
		},
		{
			title: 'Community',
			id: 'community',
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			users: comminitySocial!,
		},
	];

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
	}, [activeTabId, userData]);

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

	const followHandler = (id: string) => {
		dispatch(actions.followUser({ id }));
		if (!user || !userData) {
			return;
		}
		const avatar =
			user.avatar?.length === 0
				? 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg'
				: user.avatar;
		addNotification(
			{
				id: uuid(),
				read: false,
				type: NotificationTypes.Follower,
				date: new Date(),
				body: {
					follower: {
						id: user?.id,
						username: user.username ?? '',
						profileUrl: avatar,
					} as unknown as WebApi.Entities.IUser,
				},
			},
			userData.id,
		);
	};

	const unfollowHandler = (id: string) => {
		dispatch(actions.unfollowUser({ id }));
	};

	return isLoading ? (
		<FullscreenLoader />
	) : (
		<ProfilePage
			error={error}
			userInfo={userData}
			currentUser={user}
			followHandler={followHandler}
			unfollowHandler={unfollowHandler}
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
