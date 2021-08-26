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
	return (
		<div className={styles.detailsTab}>
			<Description description={task.description} exampleTestCases={task.exampleTestCases} />
			<Contributors />
			<Stats task={task} />
		</div>
	);
};
