import React from 'react';
import honorBreakdownIcon from 'assets/icons/honor-breakdown.svg';
import ProgressBarBlock from '../../../../../../basic/progress-bar-block';
import { StatsBlock } from '../stats-block';
import styles from './honor-breakdown.module.scss';

interface IHonorBreakdownProps {
	completedChallengeDone: number | null;
	completedChallengeLeft: number;
	authoredChallengeDone: number | null;
	authoredChallengeLeft: number;
	commentsDone: number | null;
	commentsLeft: number;
	referralsDone: number | null;
	referralsLeft: number;
	achievementsDone: number | null;
	achievementsLeft: number;
}

const HonorBreakdown: React.FC<IHonorBreakdownProps> = (props) => {
	const {
		completedChallengeDone,
		completedChallengeLeft,
		authoredChallengeDone,
		authoredChallengeLeft,
		commentsDone,
		commentsLeft,
		referralsDone,
		referralsLeft,
		achievementsDone,
		achievementsLeft,
	} = props;

	return (
		<StatsBlock icon={honorBreakdownIcon} title="Honor Breakdown" elementClass={styles.HonorBreakdown}>
			<div className={styles.progressBars}>
				<ProgressBarBlock
					name="Completed Challenge"
					done={completedChallengeDone}
					left={completedChallengeLeft}
				/>
				<ProgressBarBlock
					name="Authored Challenge & Translation"
					done={authoredChallengeDone}
					left={authoredChallengeLeft}
				/>
				<ProgressBarBlock name="Comments" done={commentsDone} left={commentsLeft} />
				<ProgressBarBlock name="Referrals" done={referralsDone} left={referralsLeft} />
				<ProgressBarBlock name="Achievements" done={achievementsDone} left={achievementsLeft} />
			</div>
		</StatsBlock>
	);
};
export default HonorBreakdown;
