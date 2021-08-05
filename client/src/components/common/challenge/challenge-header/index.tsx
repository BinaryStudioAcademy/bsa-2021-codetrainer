import React from 'react';
import { Link } from 'react-router-dom';
import { Rank } from 'components';
import { IChallengeHeaderProps } from '../types';
import styles from './challenge-header.module.scss';

const ChallengeHeader: React.FC<{ header: IChallengeHeaderProps }> = ({ header: { link, title, rank } }) => {
	return (
		<div className={styles.challengeHeader}>
			<Rank rank={rank} />
			<Link to={link} className={styles.challengeHeaderTitle}>
				<span>{title}</span>
			</Link>
		</div>
	);
};

export default ChallengeHeader;
