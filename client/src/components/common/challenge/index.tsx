import React from 'react';
import ChallengeHeader from './challenge-header';
import ChallengeTagsList from './challenge-tags-list';
import ChallengeStats from './challenge-stats';
import IChallengeProps from './types';
import styles from './challenge.module.scss';

const Challenge: React.FC<{ challenge: IChallengeProps }> = ({
	challenge: { link, title, rank, stats, tags, author },
}) => {
	return (
		<div className={styles.challenge}>
			<ChallengeHeader
				header={{
					title,
					rank,
					link,
				}}
			/>
			<ChallengeStats stats={{ ...stats, author }} />
			<ChallengeTagsList tags={tags} />
		</div>
	);
};

export default Challenge;
