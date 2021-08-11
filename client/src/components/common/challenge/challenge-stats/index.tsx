import React from 'react';
import { Link } from 'react-router-dom';
import styles from './challenge-stats.module.scss';
import { IChallengeStats } from '../types';
import { faStar, faChartBar, faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChallengeStats: React.FC<{ stats: IChallengeStats }> = ({
	stats: { favoriteSaves, positiveFeedback, author },
}) => {
	return (
		<div className={styles.challengeStats}>
			<div className={styles.challengeStatsItem}>
				<p className={styles.challengeStatsItemText}>
					{/* @ts-ignore */}
					<div className={styles.challengeStatsItemIcon}>
						<FontAwesomeIcon icon={faStar} size="lg" color="rgba(40, 40, 40, 0.5)" />
					</div>
					{favoriteSaves} saved to favorites
				</p>
			</div>
			<div className={styles.challengeStatsItem}>
				<p className={styles.challengeStatsItemText}>
					{/* @ts-ignore */}
					<div className={styles.challengeStatsItemIcon}>
						<FontAwesomeIcon icon={faChartBar} size="lg" color="rgba(40, 40, 40, 0.5)" />
					</div>
					{positiveFeedback} positive feedback
				</p>
			</div>
			<div className={styles.challengeStatsItem}>
				<p className={styles.challengeStatsItemText}>
					{/* @ts-ignore */}
					<div className={styles.challengeStatsItemIcon}>
						<FontAwesomeIcon icon={faUser} size="lg" color="rgba(40, 40, 40, 0.5)" />
					</div>
					created{' '}
					<Link to={author.link} className={styles.challengeStatsItemLink}>
						{author.firstName} {author.lastName}
					</Link>
				</p>
			</div>
		</div>
	);
};

export default ChallengeStats;
