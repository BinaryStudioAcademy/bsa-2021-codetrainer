import React from 'react';
import { TaskInfo } from './task-info';
import { DetailsTab } from './tabs/detailsTab';
import styles from './task.module.scss';

export const Task = () => {
	return (
		<div className={styles.container}>
			<TaskInfo />
			<DetailsTab />
		</div>
	);
};
