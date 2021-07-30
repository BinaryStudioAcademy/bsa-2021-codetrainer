import React from 'react';
import pointsIcon from '../../../../../../assets/icons/points.svg';
import '../stats.scss';
import { List } from '../../../list';

interface PointsProps {
	rank: number;
	honor: number;
	completedChallenge: number;
}

const Points: React.FC<PointsProps> = (props) => {
	const { rank, honor, completedChallenge } = props;
	const items = [{name: 'Rank', value: rank}, {name: 'Honor', value: honor}, {name: 'Total Completed Challenge', value: completedChallenge}]


	return (
		<div>
			<div className="header">
				<img src={pointsIcon} id="pointsIcon" />
				<label htmlFor="pointsIcon" className="icon-label points-label">
					Points
				</label>
			</div>
			<List items={items} />
		</div>
	);
};
export default Points;
