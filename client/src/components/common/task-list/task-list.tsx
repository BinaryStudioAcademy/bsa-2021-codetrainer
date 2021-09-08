import { Tasks } from 'components/pages/profile/profile-tasks';
import React from 'react';
import { IChallenge } from '../challenge/types';
import styles from './task-list.module.scss';

interface ITaskListProps {
	tasks: IChallenge[];
	title?: string;
	userCanAddTaskToCollection?: boolean;
	updateTaskFavoriteStatus: (id: string) => void;
}

export const TaskList = ({
	tasks,
	title,
	userCanAddTaskToCollection = false,
	updateTaskFavoriteStatus,
}: ITaskListProps) => {
	return (
		<div className={styles.containerBlock}>
			<p className={styles.title}>{title}</p>
			<div>
				<Tasks
					tasks={tasks}
					showAddToCollection={userCanAddTaskToCollection}
					updateTaskFavoriteStatus={updateTaskFavoriteStatus}
				/>
			</div>
		</div>
	);
};
