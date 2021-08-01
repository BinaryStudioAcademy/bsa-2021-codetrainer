import React from 'react';
import rankBreakdownIcon from 'assets/icons/rank-breakdown.svg';
import styles from './rank-breakdown.module.scss';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { StatsBlock } from '../stats-block';

interface IRankBreakdownProps {
	rankProgress: number;
	rank: number;
}

const RankBreakdown: React.FC<IRankBreakdownProps> = (props) => {
	const { rankProgress, rank } = props;

	return (
		<StatsBlock icon={rankBreakdownIcon} title="Rank Breakdown" elementClass={styles.rankBreakdown}>
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
					{rank} ran/ {rankProgress}
				</span>
				%
			</div>
		</StatsBlock>
	);
};

export default RankBreakdown;

const circularProgressBarStyles = {
	strokeLinecap: 'round',
	textSize: '14px',
	pathColor: `#ec4179`,
	trailColor: '#F0F3F9',
	backgroundColor: '#F0F3F9',
};
