import React from 'react';
import honorBreakdownIcon from 'assets/icons/honor-breakdown.svg';
import ProgressBarBlock from '../../../../../../basic/progress-bar-block';
import { StatsBlock } from '../stats-block';
import styles from './honor-breakdown.module.scss';

export interface IHonorBreakdownProps {
	completedChallengeDone: number | null;
	completedChallengeTotal: number;
	authoredChallengeDone: number | null;
	authoredChallengeTotal: number;
	commentsDone: number | null;
	commentsTotal: number;
}

const HonorBreakdown: React.FC<IHonorBreakdownProps> = (props) => {
	const {
		completedChallengeDone,
		completedChallengeTotal,
		authoredChallengeDone,
		authoredChallengeTotal,
		commentsDone,
		commentsTotal,
	} = props;
	return (
		<StatsBlock icon={honorBreakdownIcon} title="Honor Breakdown" elementClass={styles.HonorBreakdown}>
			<div className={styles.progressBars}>
				<ProgressBarBlock
					name="Completed Challenge"
					done={completedChallengeDone}
					left={completedChallengeTotal}
				/>
				<ProgressBarBlock
					name="Authored Challenge"
					done={authoredChallengeDone}
					left={authoredChallengeTotal}
				/>
				<ProgressBarBlock name="Comments" done={commentsDone} left={commentsTotal} />
			</div>
		</StatsBlock>
	);
};
export default HonorBreakdown;
