import React from 'react';
import { TaskInfo } from './task-info';
import styles from './task.module.scss';
import { ITabsRouterProps, TabsRouter } from './tabs-router';
import { IChallenge } from 'components/common/challenge/types';

export interface ITaskProps {
	task: IChallenge;
	getTabContent: () => React.ReactNode;
	tabsRouterProps: ITabsRouterProps;
}

export const Task = ({ task, tabsRouterProps, getTabContent, onTrainClick }: ITaskProps) => {
	return (
		<div className={styles.container}>
			<TaskInfo challengeProps={task} />
			<TabsRouter {...tabsRouterProps} />
			{getTabContent()}
		</div>
	);
};
