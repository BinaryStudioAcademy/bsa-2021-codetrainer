import React from 'react';
import { IChallenge } from 'components/common/challenge/types';
import { Challenge } from 'components/common';
import styles from './styles.module.scss';
import { Button } from 'components';
import clsx from 'clsx';
import { ButtonClasses } from 'components/basic/button';
import historyHelper from 'helpers/history.helper';
import { ROUTES } from 'constants/routes';

interface IProfileTasks {
	tasks: IChallenge[];
	showAddToCollection?: boolean;
	emptyTasks?: string;
}

export const Tasks: React.FC<IProfileTasks> = ({ tasks, showAddToCollection, emptyTasks }) => (
	<div className={styles.root}>
		{tasks.length > 0 ? (
			tasks.map((task, index) => (
				<Challenge {...task} showAddToCollection={showAddToCollection} key={index.toString()} />
			))
		) : (
			<>
				<div className={styles.empty}>You dont have any {emptyTasks} tasks yet.</div>
				<Button
					className={clsx(ButtonClasses.red, styles.button)}
					onClick={() => historyHelper.push(ROUTES.createTask)}
				>
					Create new task
				</Button>
			</>
		)}
	</div>
);
