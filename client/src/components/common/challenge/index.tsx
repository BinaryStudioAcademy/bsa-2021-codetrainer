import React from 'react';
import ChallengeHeader from './challenge-header';
import ChallengeTagsList from './challenge-tags-list';
import ChallengeStats from './challenge-stats';
import IChallenge from './types';
import styles from './index.module.scss';

const Challenge: React.FC<{ challenge: IChallenge }> = ({ challenge: { title, rank, stats, tags, author } }) => {
	return (
		<div className={styles.challenge}>
			<ChallengeHeader
				header={{
					title,
					rank,
				}}
			/>
			<ChallengeStats stats={{ ...stats, author }} />
			<ChallengeTagsList tags={tags} />
		</div>
	);
};

export default Challenge;
