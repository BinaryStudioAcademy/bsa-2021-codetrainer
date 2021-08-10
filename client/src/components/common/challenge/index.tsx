import React from 'react';
import Header from './components/header';
import TagsList from './components/tags-list';
import Stats from './components/stats';
import styles from './challenge.module.scss';
import { IChallengeProps } from 'components/pages/search-page';

const Challenge: React.FC<IChallengeProps> = ({ linkToAuthor, author, stats, title, rank, tags }) => {
	return (
		<div className={styles.challenge}>
			<Header title={title} rank={rank} linkToAuthor={linkToAuthor} />
			<Stats stats={{ ...stats, author }} />
			<TagsList tags={tags} />
		</div>
	);
};

export default Challenge;
