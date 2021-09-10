import React from 'react';
import ChallengeHeader from './challenge-header';
import ChallengeTagsList from './challenge-tags-list';
import ChallengeStats from './challenge-stats';
import styles from './challenge.module.scss';
import { IChallenge } from './types';
import { CollectionModal } from 'components/modals';
import { addTaskToCollection } from 'services/collections.service';
import { useAppSelector, useUserSelector } from 'hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import * as actions from 'containers/collections/logic/actions';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Challenge: React.FC<
	IChallenge & {
		showAddToCollection?: boolean;
		handleFetchCollections: () => void;
		handleChallengeClick: (id: string) => void;
		deleteTask?: {
			showDelete: boolean;
			handleDelete: (id: string) => void;
		};
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
	deleteTask,
}) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const selectedTask = useAppSelector((store) => store.collections.selectedTask);
	const dispatch = useDispatch();
	const user = useUserSelector();
	const handleClickCollection = (id: string) => {
		if (selectedTask) {
			addTaskToCollection(id, selectedTask);
			setIsOpen(false);
			if (user && user.id) {
				dispatch(actions.fetchCollections({ userId: user.id }));
			}
		}
	};
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
					handleClickCollection={handleClickCollection}
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
			{deleteTask?.showDelete ? (
				<div onClick={() => deleteTask.handleDelete(id)}>
					<DeleteForeverIcon />
				</div>
			) : null}
		</div>
	);
};

export default Challenge;
