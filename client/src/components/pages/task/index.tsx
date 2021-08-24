import React from 'react';
import { TaskInfo } from './task-info';
import styles from './task.module.scss';
import { ITabsRouterProps, TabsRouter } from './tabs-router';

export interface ITaskProps {
	getTabContent: () => React.ReactNode;
	tabsRouterProps: ITabsRouterProps;
}

export const Task = ({ tabsRouterProps, getTabContent }: ITaskProps) => {
	return (
		<div className={styles.container}>
			<TaskInfo />
			<TabsRouter {...tabsRouterProps} />
			{getTabContent()}
		</div>
	);
};
