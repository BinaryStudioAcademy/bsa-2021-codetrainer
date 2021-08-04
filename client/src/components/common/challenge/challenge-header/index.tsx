import React from 'react';
import { Rank } from 'components';
import { IChallengeHeaderProps } from '../types';
import styles from './challenge-header.module.scss';

const ChallengeHeader: React.FC<{ header: IChallengeHeaderProps }> = ({ header: { title, rank } }) => {
	return (
		<div className={styles.challengeHeader}>
			<Rank rank={rank} />
			<span className={styles.challengeHeaderTitle}>{title}</span>
		</div>
	);
};

export default ChallengeHeader;
