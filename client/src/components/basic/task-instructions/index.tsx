import React from 'react';
import Statistics from './components/Statistics';
import Rank from './components/Rank';
import styles from './task-instructions.module.scss';
import './task-details.scss';

interface ITaskInstructionProps {
	title: string;
	html: JSX.Element;
	favorites: number;
	rating: number;
	createdBy: string;
}

const TaskInstructions: React.FC<ITaskInstructionProps> = (props: ITaskInstructionProps) => {
	return (
		<div className={styles.taskContainer}>
			<div className={styles.header}>
				<Rank difficulty={6} />
				<h2 className={styles.title}>{props.title}</h2>
			</div>
			<div className={styles.task}>
				<div className={styles.switch}>
					<a className={styles.active}>Instructions</a>
					<a>Output</a>
				</div>
				<hr className={styles.divider} />
				<div className={styles.details}>{props.html}</div>
			</div>
			<div className={styles.infoContainer}>
				<Statistics icon="star-empty" content={<p>{props.favorites} saved to favorite</p>} />
				<Statistics
					icon="timeline-bar-chart"
					content={<p>{props.rating}% positive feedback</p>}
					divider={true}
				/>
				<Statistics
					icon="person"
					content={
						<p>
							created by <a>Emerson Saris</a>
						</p>
					}
				/>
			</div>
		</div>
	);
};
export default TaskInstructions;
