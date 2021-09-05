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
		completedChallenge: userData?.solutions?.length ?? 0,
	};

	const mockLanguagesProps = {
		languagesTrained: userData?.languages?.length ?? 0,
		highestTrained: userData ? (userData.languages ? userData.languages[0].name : 'JS') : 'JS',
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
		completedChallengeDone: userData
			? userData.solutions
				? userData.solutions.filter((solution) => solution.completed === true).length
				: 0
			: 0,
		completedChallengeTotal: userData?.solutions?.length ?? 0,
		authoredChallengeDone: userData?.tasks?.length ?? 0,
		authoredChallengeTotal: getMaxTotal(userData?.tasks?.length ?? 0),
		commentsDone: userData?.comments?.length ?? 0,
		commentsTotal: getMaxTotal(userData?.comments?.length ?? 0),
		referralsDone: userData?.referrals?.length ?? 0,
		referralsTotal: getMaxTotal(userData?.referrals?.length ?? 0),
		achievementsDone: userData?.achivements?.length ?? 0,
		achievementsTotal: getMaxTotal(userData?.achivements?.length ?? 0),
	};

	const mockRankBreakDownProps = {
		rankProgress: ((userData?.honor ?? 0) * 100) / NextRankHonor[getNextRank(userData?.rank ?? 9)],
		rank: userData?.rank ?? 9,
	};

	const getNumberOfReplies = (
		comments: Array<{
			replies: Array<any>;
		}>,
	) => {
		let result = 0;
		comments.forEach((comment) => {
			result += comment.replies.length;
		});
		return result;
	};
	const getApproved = (translations: Array<{ approved: boolean }>) => {
		let result = 0;
		translations.forEach((translation) => {
			result += translation.approved ? 1 : 0;
		});
		return result;
	};
	const mockCommunityProps = {
		comments: userData?.comments?.length ?? 0,
		replies: getNumberOfReplies(userData?.comments ?? [{ replies: [] }]),
		collections: userData?.collections?.length ?? 0,
		translations: userData?.translations?.length ?? 0,
		approved: getApproved(userData?.translations ?? [{ approved: false }]),
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
	};

	const unfollowHandler = (id: string) => {
		dispatch(actions.unfollowUser({ id }));
	};
	console.log('user data, ', userData);

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
