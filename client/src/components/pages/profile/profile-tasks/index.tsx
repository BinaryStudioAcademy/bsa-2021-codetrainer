import React from 'react';
import { ProfileTasksSideBar, ITasksSideBar } from './side-bar';
import IChallengeProps from 'components/common/challenge/types';
import { Tasks } from './tasks';

import styles from './styles.module.scss';

interface IProfileTasks {
	sideBar: ITasksSideBar;
	tasks: IChallengeProps[];
}

export const ProfileTasks: React.FC<IProfileTasks> = ({ sideBar, tasks }) => (
	<div className={styles.root}>
		<ProfileTasksSideBar {...sideBar} />
		<Tasks tasks={tasks} />
	</div>
);
