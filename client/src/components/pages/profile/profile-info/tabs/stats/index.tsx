import React from 'react';
import Points, { IPointsProps } from './points';
import HonorBreakdown, { IHonorBreakdownProps } from './honor-breakdown';
import Languages, { ILanguagesProps } from './languages';
import Community, { ICommunityProps } from './community';
import styles from './stats.module.scss';
import RankBreakdown, { IRankBreakdownProps } from './rank-breakdown';

export interface IStatsProps {
	points: IPointsProps;
	languages: ILanguagesProps;
	honorBreakdown: IHonorBreakdownProps;
	rankBreakdown: IRankBreakdownProps;
	community: ICommunityProps;
}

export const Stats: React.FC<IStatsProps> = (props) => {
	return (
		<div className={styles.stats}>
			<Points {...props.points} />
			<Languages {...props.languages} />
			<HonorBreakdown {...props.honorBreakdown} />
			<RankBreakdown {...props.rankBreakdown} />
			<Community {...props.community} />
		</div>
	);
};
//
// const mockPointsProps = {
// 	rank: 7,
// 	honor: 455,
// 	completedChallenge: 23,
// };
//
// const mockLanguagesProps = {
// 	languagesTrained: 4,
// 	highestTrained: 'JS',
// 	mostRecent: 'JS',
// };
//
// const mockHonorBreakdownProps = {
// 	completedChallengeDone: 5,
// 	completedChallengeTotal: 10,
// 	authoredChallengeDone: null,
// 	authoredChallengeTotal: 0,
// 	commentsDone: null,
// 	commentsTotal: 0,
// 	referralsDone: null,
// 	referralsTotal: 0,
// 	achievementsDone: 8,
// 	achievementsTotal: 9,
// };
//
// const mockRankBreakDownProps = {
// 	rankProgress: 25,
// 	rank: 8,
// };
//
// const mockCommunityProps = {
// 	comments: 3,
// 	collections: 2,
// 	transactions: 12,
// };
