import React from 'react';
import { TaskInfo } from './task-info';
import styles from './task.module.scss';
import { ITabsRouterProps, TabsRouter } from './tabs-router';

export interface ITaskProps {
	getTabContent: () => React.ReactNode;
	tabsRouterProps: ITabsRouterProps;
}

export const Task = ({ tabsRouterProps, getTabContent }: ITaskProps) => {
	const challengeProps = {
		id: 'fdsafsa',
		author: {
			firstName: 'fdsa',
			lastName: 'fdsafdsagfds',
			link: '',
		},
		linkToAuthor: '',
		title: 'title',
		rank: 8,
		stats: {
			favoriteSaves: 23,
			positiveFeedback: 88,
		},
		tags: ['fdsafdsa', 'fdsafdsewqrwe', 'terwtree'],
	};

	return (
		<div className={styles.container}>
			<TaskInfo challengeProps={challengeProps} />
			<TabsRouter {...tabsRouterProps} />
			{getTabContent()}
		</div>
	);
};
