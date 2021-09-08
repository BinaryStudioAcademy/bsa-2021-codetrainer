// import { Avatar } from 'components/basic';
import React from 'react';
import styles from './details-tab.module.scss';
import { Description } from './description';
import { Contributors } from './contributors';
import { Stats } from './stats';
import { WebApi } from 'typings/webapi';
import { IChallenge } from 'components/common/challenge/types';
import { SimilarTasks } from './similar-tasks';

export interface IDetailsTabProps {
	task: WebApi.Entities.IChallenge;
	tasks?: IChallenge[] | null;
	updateTaskFavoriteStatus: (id: string) => void;
}

export const DetailsTab = ({ task, tasks, updateTaskFavoriteStatus }: IDetailsTabProps) => {
	const contributors = [...task.contributors];

	if (task.user) {
		contributors.push(task.user);
	}

	return (
		<div className={styles.detailsTab}>
			<Description description={task.description} exampleTestCases={task.exampleTestCases} />
			<Contributors contributors={contributors} />
			<SimilarTasks tasks={tasks} updateTaskFavoriteStatus={updateTaskFavoriteStatus} />
			<Stats task={task} />
		</div>
	);
};
