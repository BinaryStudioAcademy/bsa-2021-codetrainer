import React from 'react';
import IChallengeProps from 'components/common/challenge/types';
import { Challenge } from 'components/common';

import styles from './tasks.module.scss';

interface IProfileTasks {
	tasks: IChallengeProps[];
}

export const Tasks: React.FC<IProfileTasks> = ({ tasks }) => (
	<div className={styles.root}>
		{tasks.map((task, index) => (
			<Challenge {...task} key={index.toString()} />
		))}
	</div>
);
