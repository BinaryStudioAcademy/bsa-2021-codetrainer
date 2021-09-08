import { TaskList } from 'components/common';
import { IChallenge } from 'components/common/challenge/types';
import React from 'react';
import styles from './similar-tasks.module.scss';

export interface ISimilarTasksProps {
	tasks?: IChallenge[] | null;
	updateTaskFavoriteStatus: (id: string) => void;
}
export const SimilarTasks = ({ tasks, updateTaskFavoriteStatus }: ISimilarTasksProps) => {
	return (
		<div className={styles.similarTasks}>
			{tasks ? (
				<>
					<h3>Similar tasks:</h3>
					<TaskList tasks={tasks} updateTaskFavoriteStatus={updateTaskFavoriteStatus} />
				</>
			) : (
				'No similar tasks found'
			)}
		</div>
	);
};
