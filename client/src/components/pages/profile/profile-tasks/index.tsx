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
	deleteTask?: {
		showDelete: boolean;
		handleDelete: (id: string) => void;
	};
}

export const Tasks: React.FC<IProfileTasks> = ({ tasks, showAddToCollection, emptyTasks, deleteTask }) => (
	<div className={styles.root}>
		{tasks.length > 0 ? (
			tasks.map((task, index) => (
				<Challenge
					{...task}
					showAddToCollection={showAddToCollection}
					key={index.toString()}
					deleteTask={deleteTask}
				/>
			))
		) : (
			<>
				<div className={styles.empty}>{emptyTasks}</div>
				<Button
					className={clsx(ButtonClasses.red, styles.button)}
					onClick={() => historyHelper.push(ROUTES.createTask)}
				>
					Create new challenge
				</Button>
			</>
		)}
	</div>
);
