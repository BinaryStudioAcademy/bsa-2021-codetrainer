import React from 'react';
import styles from './task-instructions.module.scss';

import { Icon } from '@blueprintjs/core';

interface Props {
	title: string;
	description: string;
	demands: string[];
	examples: string[];
	tags: string[];
}

const TaskInstructions: React.FC<Props> = (props: Props) => {
	const mapDataToElements = (data: string[], tag: string, style: string): JSX.Element[] => {
		const CustomElement: any = `${tag}`;
		return data.map((d, index) => (
			<CustomElement className={style} key={index}>
				{d}
			</CustomElement>
		));
	};

	return (
		<div className={styles.taskContainer}>
			<h2 className={styles.title}>{props.title}</h2>
			<div className={styles.task}>
				<div className={styles.switch}>
					<a className={styles.active}>Instructions</a>
					<a>Output</a>
				</div>
				<hr className={styles.divider} />
				<p className={styles.title}>{props.description}</p>
				<ul className={styles.demands}>{mapDataToElements(props.demands, 'span', styles.demand)}</ul>
				<h3>Examples:</h3>
				<div className={styles.examples}>{mapDataToElements(props.examples, 'p', styles.example)}</div>
				<div className={styles.tags}>{mapDataToElements(props.tags, 'p', styles.tag)}</div>
			</div>
			<div className={styles.infoContainer}>
				<div className={styles.info}>
					<Icon icon="star-empty" color="rgba(40, 40, 40, 0.5)" />
					<div className={styles.infoDescription}>540 saved to favorite</div>
				</div>
				<div className={`${styles.info} ${styles.infoDivider}`}>
					<Icon icon="timeline-bar-chart" color="rgba(40, 40, 40, 0.5)" />
					<div className={`${styles.infoDescription}`}>88% positive feedback</div>
				</div>
				<div className={styles.info}>
					<Icon icon="person" color="rgba(40, 40, 40, 0.5)" />
					<div className={styles.infoDescription}>
						created<span>Emerson Saris</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TaskInstructions;
