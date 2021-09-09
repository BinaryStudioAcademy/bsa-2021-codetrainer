import React from 'react';
import ChallengeHeader from './challenge-header';
import ChallengeTagsList from './challenge-tags-list';
import ChallengeStats from './challenge-stats';
import styles from './challenge.module.scss';
import { IChallenge } from './types';
import { CollectionModal } from 'components/modals';

const Challenge: React.FC<
	IChallenge & {
		showAddToCollection?: boolean;
		handleFetchCollections: () => void;
		handleChallengeClick: (id: string) => void;
	}
> = ({
	id,
	linkToTask,
	author,
	stats,
	title,
	rank,
	tags,
	showAddToCollection = true,
	handleFetchCollections,
	handleChallengeClick,
}) => {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<div className={styles.challenge}>
			<ChallengeHeader title={title} rank={rank} linkToTask={linkToTask} />
			<ChallengeStats stats={{ ...stats, author }} />
			{tags && Boolean(tags.length) ? <ChallengeTagsList tags={tags} /> : null}
			{isOpen ? (
				<CollectionModal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					handleFetchCollections={handleFetchCollections}
				/>
			) : null}
			{showAddToCollection && (
				<a
					className={styles.modal}
					onClick={() => {
						setIsOpen(true);
						handleChallengeClick(id);
					}}
				>
					Add to collection
				</a>
			)}
		</div>
	);
};

export default Challenge;
