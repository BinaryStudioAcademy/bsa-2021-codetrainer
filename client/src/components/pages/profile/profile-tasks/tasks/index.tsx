import React from 'react';
import IChallengeProps from 'components/common/challenge/types';
import { Challenge } from 'components/common';

import styles from './styles.module.scss';

interface IProfileTasks {
	tasks: IChallengeProps[];
}

export const Tasks: React.FC<IProfileTasks> = ({ tasks }) => (
	<div className={styles.root}>
		{tasks.map((task, index) => (
			<Challenge challenge={task} key={index.toString()} />
		))}
	</div>
);
