import React from 'react';
import clsx from 'clsx';
import Statistics from './components/statistics';
import Details from './components/details';
import { Rank } from '../../basic';
import styles from './task-instructions.module.scss';
import { TaskTabType, ITaskInstructionsProps } from './types';

const TaskInstructions: React.FC<ITaskInstructionsProps> = ({ data, activeTab, onClick }) => {
	return (
		<div className={styles.taskContainer}>
			<div className={styles.header}>
				<Rank rank={data.rank} />
				<h2 className={styles.title}>{data.title}</h2>
			</div>
			<div className={styles.task}>
				<div className={styles.switch}>
					<button
						onClick={() => onClick('instructions')}
						className={clsx({ [styles.active]: activeTab === TaskTabType.INSTRUCTIONS })}
					>
						Instructions
					</button>
					<button
						onClick={() => onClick('output')}
						className={clsx({ [styles.active]: activeTab === TaskTabType.OUTPUT })}
					>
						Output
					</button>
				</div>
				<hr />
				<Details tabType={activeTab} />
			</div>
			<div className={styles.infoContainer}>
				<Statistics icon="far fa-star" content={<p>{data.favorites} saved to favorite</p>} />
				<Statistics icon="far fa-chart-bar" content={<p>{data.rating}% positive feedback</p>} divider />
				<Statistics
					icon="fas fa-user"
					content={
						<p>
							created by <a href={data.createdBy.href}>{data.createdBy.name}</a>
						</p>
					}
				/>
			</div>
		</div>
	);
};
export default TaskInstructions;
