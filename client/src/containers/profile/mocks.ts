export const mockProfileBioProps = {
	img: 'https://hyperhost.ua/info/storage/avatars/user-ava.png',
	name: 'name',
	nickname: 'nickname',
	clan: 'clan',
	memberSince: '14 jul',
	lastSeen: '13 sep',
	gitHubUrl: 'github link',
	followingQuantity: 0,
	followersQuantity: 0,
	communityQuantity: 3,
};
export const mockPointsProps = {
	rank: 7,
	honor: 455,
	completedChallenge: 23,
};

export const mockLanguagesProps = {
	languagesTrained: 4,
	highestTrained: 'JS',
	mostRecent: 'JS',
};

export const mockHonorBreakdownProps = {
	completedChallengeDone: 5,
	completedChallengeTotal: 10,
	authoredChallengeDone: null,
	authoredChallengeTotal: 0,
	commentsDone: null,
	commentsTotal: 0,
	referralsDone: null,
	referralsTotal: 0,
	achievementsDone: 8,
	achievementsTotal: 9,
};

export const mockRankBreakDownProps = {
	rankProgress: 25,
	rank: 8,
};

export const mockCommunityProps = {
	comments: 3,
	collections: 2,
	transactions: 12,
};

export const statsProps = {
	points: mockPointsProps,
	languages: mockLanguagesProps,
	honorBreakdown: mockHonorBreakdownProps,
	rankBreakdown: mockRankBreakDownProps,
	community: mockCommunityProps,
};

export const profileTasks = [
	{
		title: 'Completed',
		tasks: [
			{
				author: {
					firstName: 'A',
					lastName: 'B',
					link: '/',
				},
				stats: {
					favoriteSaves: 12,
					positiveFeedback: 12,
				},
				title: 'Title',
				rank: 2,
				tags: ['Tag 1', 'Tag 2'],
			},
			{
				author: {
					firstName: 'A',
					lastName: 'B',
					link: '/',
				},
				stats: {
					favoriteSaves: 12,
					positiveFeedback: 12,
				},
				title: 'Title',
				rank: 2,
				tags: ['Tag 1', 'Tag 2'],
			},
		],
	},
	{
		title: 'Authored',
		tasks: [
			{
				author: {
					firstName: 'A',
					lastName: 'B',
					link: '/',
				},
				stats: {
					favoriteSaves: 12,
					positiveFeedback: 12,
				},
				title: 'Auth',
				rank: 2,
				tags: ['Tag 1', 'Tag 2'],
			},
			{
				author: {
					firstName: 'A',
					lastName: 'B',
					link: '/',
				},
				stats: {
					favoriteSaves: 12,
					positiveFeedback: 12,
				},
				title: 'Auth',
				rank: 2,
				tags: ['Tag 1', 'Tag 2'],
			},
		],
	},
];
