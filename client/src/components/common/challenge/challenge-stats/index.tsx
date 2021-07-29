import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@blueprintjs/core';
import styles from './index.module.scss';
import { IChallengeStats } from '../types';

const ChallengeStats: React.FC<{ stats: IChallengeStats }> = ({
	stats: { favouriteSaves, positiveFeedback, author },
}) => {
	return (
		<div className={styles['challenge-stats']}>
			<div className={styles['challenge-stats-item']}>
				<p className={styles['challenge-stats-item__text']}>
					<Icon icon="star-empty" className={styles['challenge-stats-item__icon']} />
					{favouriteSaves} saved to favorites
				</p>
			</div>
			<div className={styles['challenge-stats-item']}>
				<p className={styles['challenge-stats-item__text']}>
					<Icon icon="vertical-bar-chart-asc" className={styles['challenge-stats-item__icon']} />
					{positiveFeedback} positive feedback
				</p>
			</div>
			<div className={styles['challenge-stats-item']}>
				<p className={styles['challenge-stats-item__text']}>
					<Icon icon="user" className={styles['challenge-stats-item__icon']} />
					created{' '}
					<Link to={author.link} className={styles['challenge-stats-item__link']}>
						{author.firstName} {author.lastName}
					</Link>
				</p>
			</div>
		</div>
	);
};

export default ChallengeStats;
