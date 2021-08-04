import React from 'react';
import rankBreakdownIcon from 'assets/icons/rank-breakdown.svg';
import styles from './rank-breakdown.module.scss';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { StatsBlock } from '../stats-block';
import { circularProgressBarStyles } from './config';

export interface IRankBreakdownProps {
	rankProgress: number;
	rank: number;
}

const RankBreakdown: React.FC<IRankBreakdownProps> = (props) => {
	const { rankProgress, rank } = props;

	return (
		<StatsBlock icon={rankBreakdownIcon} title="Rank Breakdown" elementClass={styles.rankBreakdown}>
			<div className={styles.rankBreakdownBody}>
				<div style={{ width: '150px' }}>
					<CircularProgressbarWithChildren
						className={styles.circularProgressbar}
						value={rankProgress}
						strokeWidth={5}
						styles={buildStyles(circularProgressBarStyles)}
					>
						<span className={styles.nextRankLabel}>Next Rank</span>
					</CircularProgressbarWithChildren>
				</div>
				<div className={styles.progressCircleInfo}>
					<span className={styles.overallLabel}>Overall: </span>
					<span>
						{rank} rank/ {rankProgress}
					</span>
					%
				</div>
			</div>
		</StatsBlock>
	);
};

export default RankBreakdown;
