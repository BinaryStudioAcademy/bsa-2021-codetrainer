import React from 'react';
import rankBreakdownIcon from '../../../../../../assets/icons/rank-breakdown.svg';
import './rank-breakdown.scss';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { StatsBlock } from '../stats-block';

interface IRankBreakdownProps {
	rankProgress: number;
	rank: number;
}

const RankBreakdown: React.FC<IRankBreakdownProps> = (props) => {
	const { rankProgress, rank } = props;

	return (
		<StatsBlock icon={rankBreakdownIcon} title='Rank'>
			<div style={{ width: '150px' }}>
				<CircularProgressbarWithChildren
					className="circular-progressbar"
					value={rankProgress}
					strokeWidth={5}
					styles={buildStyles(circularProgressBarStyles)}
				>
					<strong className="circular-progress" style={{ fontSize: '16px', paddingBottom: '50px' }}>
						Next Rank
					</strong>
				</CircularProgressbarWithChildren>
			</div>
			<div className="progress-circle-info">
				<strong>Overall: </strong>
				<span>{rank}</span>ran/<span>{rankProgress}</span>%
			</div>
		</StatsBlock>
	);
};

export default RankBreakdown;

const circularProgressBarStyles = {
	strokeLinecap: 'butt',
	textSize: '14px',
	pathColor: `#ec4179`,
	trailColor: '#F0F3F9',
	backgroundColor: '#F0F3F9',
};
