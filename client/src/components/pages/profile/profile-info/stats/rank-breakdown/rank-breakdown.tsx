import React from 'react';
import rankBreakdownIcon from '../../../../../../assets/icons/rank-breakdown.svg';
import './rank-breakdown.scss';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';

interface RankBreakdownProps {
	rankProgress: number;
	rank: number;
}

const RankBreakdown: React.FC<RankBreakdownProps> = (props) => {
	const { rankProgress, rank } = props;

	return (
		<div className="rank-breakdown">
			<div className="header">
				<img src={rankBreakdownIcon} id="rankBreakdownIcon" />
				<label htmlFor="rankBreakdownIcon" className="icon-label">
					Rank Breakdown
				</label>
			</div>
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
		</div>
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
