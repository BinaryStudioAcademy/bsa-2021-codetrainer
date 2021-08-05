import React from 'react';
import clsx from 'clsx';
import Statistics from './components/statistics';
import Details from './components/details';
import { Rank } from '../index';
import styles from './task-instructions.module.scss';
import { TaskTabType } from './config';

interface ITaskInstructions {
	data: {
		title: string;
		favorites: number;
		rating: number;
		createdBy: { name: string; href: string };
		rank: number;
	};
	activeTab: string;
	onClick: (tab: string) => void;
}

const TaskInstructions: React.FC<ITaskInstructions> = ({ data, activeTab, onClick }) => {
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
						className={clsx({ [styles.active]: activeTab === TaskTabType.instructions })}
					>
						Instructions
					</button>
					<button
						onClick={() => onClick('output')}
						className={clsx({ [styles.active]: activeTab === TaskTabType.output })}
					>
						Output
					</button>
				</div>
				<hr />
				<Details tabType={activeTab} />
			</div>
			<div className={styles.infoContainer}>
				<Statistics icon="star-empty" content={<p>{data.favorites} saved to favorite</p>} />
				<Statistics icon="timeline-bar-chart" content={<p>{data.rating}% positive feedback</p>} divider />
				<Statistics
					icon="person"
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
