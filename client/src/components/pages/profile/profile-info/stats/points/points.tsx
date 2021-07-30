import React from 'react';
import pointsIcon from '../../../../../../assets/icons/points.svg';
import styles from '../stats.module.scss';
import { List } from '../../../list';

interface PointsProps {
	rank: number;
	honor: number;
	completedChallenge: number;
}

const Points: React.FC<PointsProps> = (props) => {
	const { rank, honor, completedChallenge } = props;
	const items = [
		{ name: 'Rank', value: rank },
		{ name: 'Honor', value: honor },
		{ name: 'Total Completed Challenge', value: completedChallenge },
	];

	return (
		<div>
			<div className={styles.header}>
				<img src={pointsIcon} id="pointsIcon" />
				<label htmlFor="pointsIcon" className={styles.iconLabel + ' ' + styles.pointsLabel}>
					Points
				</label>
			</div>
			<List items={items} />
		</div>
	);
};
export default Points;
