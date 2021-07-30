import React from 'react';
import honorBreakdownIcon from '../../../../../../assets/icons/honor-breakdown.svg';
import styles from '../stats.module.scss';
import honorStyles from './honor-breakdown.module.scss';
import Index from './progress-bar-block';

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
		<div className="honor-breakdown">
			<div className={styles.header}>
				<img src={honorBreakdownIcon} id="honorBreakdownIcon" />
				<label htmlFor="honorBreakdownIcon" className={styles.iconLabel}>
					Honor Breakdown
				</label>
			</div>
			<div className={honorStyles.progressBars}>
				<Index name="Completed Challenge" done={completedChallengeDone} left={completedChallengeLeft} />
				<Index
					name="Authored Challenge & Translation"
					done={authoredChallengeDone}
					left={authoredChallengeLeft}
				/>
				<Index name="Comments" done={commentsDone} left={commentsLeft} />
				<Index name="Referrals" done={referralsDone} left={referralsLeft} />
				<Index name="Achievements" done={achievementsDone} left={achievementsLeft} />
			</div>
		</div>
	);
};
export default HonorBreakdown;
