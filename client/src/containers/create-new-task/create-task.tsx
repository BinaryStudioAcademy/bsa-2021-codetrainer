import React from 'react';
import { CreateSettings } from './create-task-settings';
import styles from './create-task.module.scss';

export interface ICreateTaskProps {}

export const CreateTask = (props: ICreateTaskProps) => {
	return (
		<div className={styles.createTaskBlock}>
			<CreateSettings />
			<CreateSettings />
			<CreateSettings />
			<CreateSettings />
		</div>
	);
};
