import React from 'react';
import { TaskInfo } from './task-info';
import styles from './task.module.scss';

export const Task = () => {
	return (
		<div className={styles.container}>
			<TaskInfo />
			<div>task details</div>
			<div>contributors</div>
		</div>
	);
};
