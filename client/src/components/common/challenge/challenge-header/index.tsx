import React from 'react';
import { Link } from 'react-router-dom';
import { Rank } from 'components';
import { IChallengeHeader } from '../types';
import styles from './challenge-header.module.scss';

const ChallengeHeader = ({ rank, title, linkToAuthor }: IChallengeHeader) => {
	return (
		<div className={styles.challengeHeader}>
			<Rank rank={rank} />
			<Link to={linkToAuthor} className={styles.challengeHeaderTitle}>
				<span>{title}</span>
			</Link>
		</div>
	);
};

export default ChallengeHeader;
