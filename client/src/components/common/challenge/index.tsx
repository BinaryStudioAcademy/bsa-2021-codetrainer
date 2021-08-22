import React from 'react';
import ChallengeHeader from './challenge-header';
import ChallengeTagsList from './challenge-tags-list';
import ChallengeStats from './challenge-stats';
import styles from './challenge.module.scss';
import { IChallenge } from './types';
import { CollectionModal } from 'components/modals';

const Challenge = ({ linkToAuthor, author, stats, title, rank, tags }: IChallenge) => {
	const [isOpen, setIsOpen] = React.useState(false);
	return (
		<div className={styles.challenge}>
			<ChallengeHeader title={title} rank={rank} linkToAuthor={linkToAuthor} />
			<ChallengeStats stats={{ ...stats, author }} />
			<ChallengeTagsList tags={tags} />
			<a className={styles.modal} onClick={() => setIsOpen(true)}>
				Add to collection
			</a>
			{isOpen ? <CollectionModal isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
		</div>
	);
};

export default Challenge;
