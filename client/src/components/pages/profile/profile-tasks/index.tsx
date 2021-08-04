import React, { useState } from 'react';
import { IChallengeProps } from 'components/common/challenge/types';
import { ProfileTasksSideBar } from './side-bar.ts/side-bar';
import { Tasks } from './tasks';

import styles from './styles.module.scss';

interface IProfileTasks {
	profileTasks: {
		title: string;
		tasks: IChallengeProps[];
	}[];
}

export const ProfileTasks: React.FC<IProfileTasks> = ({ profileTasks }) => {
	const [tasks, setTasks] = useState<IChallengeProps[]>(profileTasks[0].tasks);
	return (
		<div className={styles.root}>
			<ProfileTasksSideBar
				items={profileTasks.map(({ title, tasks }, index) => ({
					title: title,
					count: tasks.length,
					id: `${title}+${index}`,
				}))}
				onClick={(id) => setTasks(profileTasks[id].tasks)}
			/>
			<Tasks tasks={tasks} />
		</div>
	);
};
