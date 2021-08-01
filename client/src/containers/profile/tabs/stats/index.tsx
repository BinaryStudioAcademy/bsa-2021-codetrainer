import React from 'react';
import { StatsTab } from '../../../../components';

export const Stats: React.FC = (props) => {
	return <StatsTab {...statsProps} />;
};

const mockPointsProps = {
	rank: 7,
	honor: 455,
	completedChallenge: 23,
};

const mockLanguagesProps = {
	languagesTrained: 4,
	highestTrained: 'JS',
	mostRecent: 'JS',
};

const mockHonorBreakdownProps = {
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

const mockRankBreakDownProps = {
	rankProgress: 25,
	rank: 8,
};

const mockCommunityProps = {
	comments: 3,
	collections: 2,
	transactions: 12,
};

const statsProps = {
	points: mockPointsProps,
	languages: mockLanguagesProps,
	honorBreakdown: mockHonorBreakdownProps,
	rankBreakdown: mockRankBreakDownProps,
	community: mockCommunityProps,
};
