import React from 'react';
import { Link } from 'react-router-dom';
import styles from './challenge-stats.module.scss';
import { IChallengeStats } from '../types';
import { faStar, faChartBar, faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ROUTES } from 'constants/routes';

const ChallengeStats: React.FC<{ stats: IChallengeStats }> = ({
	stats: { favoriteSaves, positiveFeedback, author },
}) => {
	return (
		<div className={styles.challengeStats}>
			<div className={styles.challengeStatsItem}>
				<div className={styles.challengeStatsItemText}>
					{/* @ts-ignore */}
					<div className={styles.challengeStatsItemIcon}>
						<FontAwesomeIcon icon={faStar} size="lg" color="var(--text-color)" />
					</div>
					{favoriteSaves} saved to favorites
				</div>
			</div>
			<div className={styles.challengeStatsItem}>
				<div className={styles.challengeStatsItemText}>
					{/* @ts-ignore */}
					<div className={styles.challengeStatsItemIcon}>
						<FontAwesomeIcon icon={faChartBar} size="lg" color="var(--text-color)" />
					</div>
					{positiveFeedback}% positive feedback
				</div>
			</div>
			<div className={styles.challengeStatsItem}>
				<div className={styles.challengeStatsItemText}>
					{/* @ts-ignore */}
					<div className={styles.challengeStatsItemIcon}>
						<FontAwesomeIcon icon={faUser} size="lg" color="var(--text-color)" />
					</div>
					created{' '}
					{author.firstName || author.lastName ? (
						<Link to={`${ROUTES.Users}/${author.username}`} className={styles.challengeStatsItemLink}>
							{author.firstName} {author.lastName}
						</Link>
					) : (
						'unknown'
					)}
				</div>
			</div>
		</div>
	);
};

export default ChallengeStats;
