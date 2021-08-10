import React from 'react';
import { Link } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import styles from './stats.module.scss';
import { IStatsProps } from '../../types';

const Stats: React.FC<IStatsProps> = ({ stats: { favoriteSaves, positiveFeedback, author } }) => {
	return (
		<div className={styles.challengeStats}>
			<div className={styles.challengeStatsItem}>
				<p className={styles.challengeStatsItemText}>
					{/* @ts-ignore */}
					<StarBorderIcon className={styles.challengeStatsItemIcon} />
					{favoriteSaves} saved to favorites
				</p>
			</div>
			<div className={styles.challengeStatsItem}>
				<p className={styles.challengeStatsItemText}>
					{/* @ts-ignore */}
					<EqualizerIcon className={styles.challengeStatsItemIcon} />
					{positiveFeedback} positive feedback
				</p>
			</div>
			<div className={styles.challengeStatsItem}>
				<p className={styles.challengeStatsItemText}>
					{/* @ts-ignore */}
					<PersonIcon className={styles.challengeStatsItemIcon} />
					created{' '}
					<Link to={author.link} className={styles.challengeStatsItemLink}>
						{author.firstName} {author.lastName}
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Stats;
