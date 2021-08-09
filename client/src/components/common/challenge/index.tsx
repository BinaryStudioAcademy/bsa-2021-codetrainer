import React from 'react';
import ChallengeHeader from './challenge-header';
import ChallengeTagsList from './challenge-tags-list';
import ChallengeStats from './challenge-stats';
import styles from './challenge.module.scss';
import { IChallengeProps } from 'components/pages/search-page';

const Challenge = ({ linkToAuthor, author, stats, title, rank, tags }: IChallengeProps) => {
	return (
		<div className={styles.challenge}>
			<ChallengeHeader title={title} rank={rank} linkToAuthor={linkToAuthor} />
			<ChallengeStats stats={{ ...stats, author }} />
			<ChallengeTagsList tags={tags} />
		</div>
	);
};

export default Challenge;
