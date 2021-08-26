// import { Avatar } from 'components/basic';
import React from 'react';
import styles from './details-tab.module.scss';
import { Description } from './description';
import { Contributors } from './contributors';
import { Stats } from './stats';
import { WebApi } from 'typings/webapi';

export interface IDetailsTabProps {
	task: WebApi.Entities.IChallenge;
}

export const DetailsTab = ({ task }: IDetailsTabProps) => {
	const contributors = [...task.contributors];

	if (task.user) {
		contributors.push(task.user);
	}

	return (
		<div className={styles.detailsTab}>
			<Description description={task.description} exampleTestCases={task.exampleTestCases} />
			<Contributors contributors={contributors} />
			<Stats task={task} />
		</div>
	);
};
