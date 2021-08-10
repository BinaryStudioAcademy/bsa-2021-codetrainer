import React from 'react';
import ChallengeHeader from './challenge-header';
import ChallengeTagsList from './challenge-tags-list';
import ChallengeStats from './challenge-stats';
import styles from './challenge.module.scss';
import { IChallenge } from './types';

const Challenge = ({ linkToAuthor, author, stats, title, rank, tags }: IChallenge) => {
	return (
		<div className={styles.challenge}>
			<ChallengeHeader title={title} rank={rank} linkToAuthor={linkToAuthor} />
			<ChallengeStats stats={{ ...stats, author }} />
			<ChallengeTagsList tags={tags} />
		</div>
	);
};

export default Challenge;
