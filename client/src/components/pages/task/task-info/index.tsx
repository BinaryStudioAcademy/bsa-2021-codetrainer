import React from 'react';
import styles from './task-info.module.scss';

export const TaskInfo = () => {
	return (
		<div className={styles.taskInfo}>
			<div className={styles.infoBlock}></div>
			<div className={styles.buttonsBlock}></div>
			task info
		</div>
	);
};
