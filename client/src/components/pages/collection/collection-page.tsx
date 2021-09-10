import React from 'react';
import { WebApi } from 'typings/webapi';
import { ReactComponent as DefaultCollectionIcon } from 'assets/icons/collection.svg';
import { Link } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { TaskList } from 'components';
import { IChallenge } from 'components/common/challenge/types';
import styles from './collection-page.module.scss';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

interface ICollectionPage {
	collection: WebApi.Entities.ICollection;
	handleDeleteTask: (id: string) => void;
	handleDeleteCollection: (id: string) => void;
}

export const CollectionPage = ({ collection, handleDeleteTask, handleDeleteCollection }: ICollectionPage) => {
	return (
		<div className={styles.collection}>
			<div className={styles.collectionInfo}>
				<div className={styles.collectionInfoBlock}>
					{collection.avatar ? <img src={collection.avatar} alt="" /> : <DefaultCollectionIcon />}
					<div className={styles.infoBlock}>
						<h3>
							{collection.name} ({collection.tasks.length})
						</h3>
						<Link to={ROUTES.Users + '/' + collection.author.username}>
							<span>{collection.author.username}</span>
						</Link>
						<span className={styles.createdAt}>
							{new Date(collection.createdAt).getDate() +
								'.' +
								(+new Date(collection.createdAt).getMonth() + 1) +
								'.' +
								new Date(collection.createdAt).getFullYear()}
						</span>
					</div>
				</div>
				<div
					onClick={() => {
						handleDeleteCollection(collection.id);
					}}
				>
					<DeleteForeverIcon fontSize={'large'} />
				</div>
			</div>
			<TaskList
				tasks={collection.tasks.map((task) => mapToIChallenge(task))}
				deleteTask={{
					showDelete: true,
					handleDelete: handleDeleteTask,
				}}
			/>
		</div>
	);
};

const mapToIChallenge = (task: Partial<WebApi.Entities.ITask>) => {
	const result: IChallenge = {
		id: task.id ?? '',
		author: {
			firstName: task.user?.name ?? '',
			lastName: task.user?.surname ?? '',
			username: task.user?.username ?? '',
		},
		linkToTask: ROUTES.TaskInfo + '/' + task.id,
		title: task.name ?? '',
		rank: task.rank ?? 9,
		stats: {
			favoriteSaves: 0,
			positiveFeedback: 100,
		},
		tags: task.tags ? task.tags.map((tag) => tag.name) : [],
	};
	return result;
};
