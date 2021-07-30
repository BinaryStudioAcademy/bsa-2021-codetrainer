import React from 'react';
import honorBreakdownIcon from '../../../../../../assets/icons/honor-breakdown.svg';
import '../stats.scss';
import './honor-breakdown.scss';
import ProgressBarBlock from './progress-bar-block';
import { StatsBlock } from '../stats-block';

interface HonorBreakdownProps {
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

const HonorBreakdown: React.FC<HonorBreakdownProps> = (props) => {
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
		<StatsBlock icon={honorBreakdownIcon} title='Honor Breakdown'>
			<div className="progress-bars">
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
