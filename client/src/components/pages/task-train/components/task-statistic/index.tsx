import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignal, faStar, faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './task-statistic.module.scss';

interface ITaskStatisticProps {
	statistic: {
		favourites: number;
		positiveFeedback: number;
		author: {
			name: string;
			surname: string;
		};
	};
}

const TaskStatistic: React.FC<ITaskStatisticProps> = ({ statistic: { favourites, positiveFeedback, author } }) => {
	return (
		<div className={styles.taskStatistic}>
			<div className={styles.taskStatisticCategory}>
				<span>
					<FontAwesomeIcon icon={faStar} className={styles.taskStatisticIcon} />
					{favourites} saved to favourites
				</span>
			</div>
			<div className={styles.taskStatisticCategory}>
				<FontAwesomeIcon icon={faSignal} className={styles.taskStatisticIcon} />
				{positiveFeedback}% positive feedback
			</div>
			<div className={styles.taskStatisticCategory}>
				<FontAwesomeIcon icon={faUser} className={styles.taskStatisticIcon} />
				created by{' '}
				<a href="">
					{author.name} {author.surname}
				</a>
			</div>
		</div>
	);
};

export default TaskStatistic;
