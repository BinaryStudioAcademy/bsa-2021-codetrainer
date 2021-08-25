import React from 'react';
import { IChallenge } from 'components/common/challenge/types';
import { Challenge } from 'components/common';

import styles from './styles.module.scss';

interface IProfileTasks {
	tasks: IChallenge[];
	showAddToCollection?: boolean;
}

export const Tasks: React.FC<IProfileTasks> = ({ tasks, showAddToCollection }) => (
	<div className={styles.root}>
		{tasks.map((task, index) => (
			<Challenge {...task} showAddToCollection={showAddToCollection} key={index.toString()} />
		))}
	</div>
);
