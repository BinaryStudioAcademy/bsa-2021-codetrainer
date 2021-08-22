import React from 'react';
import ChallengeHeader from './challenge-header';
import ChallengeTagsList from './challenge-tags-list';
import ChallengeStats from './challenge-stats';
import styles from './challenge.module.scss';
import { IChallenge } from './types';

const Challenge: React.FC<IChallenge> = ({ linkToAuthor, author, stats, title, rank, tags }) => {
	return (
		<div className={styles.challenge}>
			<ChallengeHeader title={title} rank={rank} linkToAuthor={linkToAuthor} />
			<ChallengeStats stats={{ ...stats, author }} />
			{tags && Boolean(tags.length) ? <ChallengeTagsList tags={tags} /> : null}
		</div>
	);
};

export default Challenge;
