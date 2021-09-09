import { Tasks } from 'components/pages/profile/profile-tasks';
import React from 'react';
import { IChallenge } from '../challenge/types';
import styles from './task-list.module.scss';

interface ITaskListProps {
	tasks: IChallenge[];
	title?: string;
	userCanAddTaskToCollection?: boolean;
}

export const TaskList = ({ tasks, title, userCanAddTaskToCollection = false }: ITaskListProps) => {
	return (
		<div className={styles.containerBlock}>
			<p className={styles.title}>{title}</p>
			<div>
				<Tasks tasks={tasks} showAddToCollection={userCanAddTaskToCollection} />
			</div>
		</div>
	);
};
