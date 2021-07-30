import React from 'react';
import pointsIcon from '../../../../../../assets/icons/points.svg';
import '../stats.scss';
import { List } from '../../../list';
import { StatsBlock } from '../stats-block';

interface PointsProps {
	rank: number;
	honor: number;
	completedChallenge: number;
}

const Points: React.FC<PointsProps> = (props) => {
	const { rank, honor, completedChallenge } = props;
	const items = [{name: 'Rank', value: rank}, {name: 'Honor', value: honor}, {name: 'Total Completed Challenge', value: completedChallenge}]


	return (
		<StatsBlock icon={pointsIcon} title='Points'>
			<List items={items} />
		</StatsBlock>
	);
};
export default Points;
