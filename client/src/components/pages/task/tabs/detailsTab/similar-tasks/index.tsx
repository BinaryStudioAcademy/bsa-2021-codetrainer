import { TaskList } from 'components/common';
import { IChallenge } from 'components/common/challenge/types';
import React from 'react';
import styles from './similar-tasks.module.scss';

export interface ISimilarTasksProps {
	tasks?: IChallenge[] | null;
}
export const SimilarTasks = ({ tasks }: ISimilarTasksProps) => {
	return (
		<div className={styles.similarTasks}>
			{tasks ? (
				<>
					<h3>Similar tasks:</h3>
					<TaskList tasks={tasks} />
				</>
			) : (
				'No similar tasks found'
			)}
		</div>
	);
};
