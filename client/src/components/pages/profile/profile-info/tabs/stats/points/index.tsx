import React from 'react';
import pointsIcon from '../../../../../../../assets/icons/points.svg';
import { List } from '../../../../../../basic/list';
import { StatsBlock } from '../stats-block';

interface IPointsProps {
	rank: number;
	honor: number;
	completedChallenge: number;
}

const Points: React.FC<IPointsProps> = (props) => {
	const { rank, honor, completedChallenge } = props;
	const items = [
		{ name: 'Rank', value: rank },
		{ name: 'Honor', value: honor },
		{ name: 'Total Completed Challenge', value: completedChallenge },
	];

	return (
		<StatsBlock icon={pointsIcon} title="Points">
			<List items={items} />
		</StatsBlock>
	);
};
export default Points;
