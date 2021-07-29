import React from 'react';
import pointsIcon from '../../../assets/points.svg';
import '../stats.scss';

interface PointsProps {
	rank: number;
	honor: number;
	completedChallenge: number;
}

const Points: React.FC<PointsProps> = (props) => {
	const { rank, honor, completedChallenge } = props;

	return (
		<div>
			<div className="header">
				<img src={pointsIcon} id="pointsIcon" />
				<label htmlFor="pointsIcon" className="icon-label points-label">
					Points
				</label>
			</div>
			<p>
				<span className="field-name">Rank: </span>
				<span className="field-value">{rank}</span>
			</p>
			<p>
				<span className="field-name">Honor: </span>
				<span className="field-value">{honor}</span>
			</p>
			<p>
				<span className="field-name">Total Completed Challenge: </span>
				<span className="field-value">{completedChallenge}</span>
			</p>
		</div>
	);
};
export default Points;
