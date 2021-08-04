import React from 'react';
import Statistics from './components/statistics';
import { mockData as data } from './mockData';
import { Rank } from '../index';
import styles from './task-instructions.module.scss';
import './task-details.scss';

const TaskInstructions: React.FC = (props) => {
	const [isInstructions, setIsInstructions] = React.useState(true);

	return (
		<div className={styles.taskContainer}>
			<div className={styles.header}>
				<Rank rank={6} />
				<h2 className={styles.title}>{data.title}</h2>
			</div>
			<div className={styles.task}>
				<div className={styles.switch}>
					<a onClick={() => setIsInstructions(true)} className={isInstructions ? styles.active : ''}>
						Instructions
					</a>
					<a onClick={() => setIsInstructions(false)} className={isInstructions ? '' : styles.active}>
						Output
					</a>
				</div>
				<hr />
				{isInstructions ? <div className={styles.details}>{data.html}</div> : <></>}
			</div>
			<div className={styles.infoContainer}>
				<Statistics icon="star-empty" content={<p>{data.favorites} saved to favorite</p>} />
				<Statistics
					icon="timeline-bar-chart"
					content={<p>{data.rating}% positive feedback</p>}
					divider={true}
				/>
				<Statistics
					icon="person"
					content={
						<p>
							created by <a>{data.createdBy}</a>
						</p>
					}
				/>
			</div>
		</div>
	);
};
export default TaskInstructions;
