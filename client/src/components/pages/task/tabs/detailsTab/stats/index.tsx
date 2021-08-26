import React from 'react';
import styles from './stats.module.scss';
import { Item } from './item';
import { WebApi } from 'typings/webapi';
import moment from 'moment';

export interface IStatsProps {
	task: WebApi.Entities.IChallenge;
}

export const Stats = ({ task }: IStatsProps) => {
	return (
		<div className={styles.stats}>
			<h3>Stats</h3>
			<div className={styles.data}>
				<Item item="Created" value={moment(task.created).format('MMM Do YY')} />
				<Item item="Total stars" value={task.stars} />
				<Item item="Published" value={moment(task.published).format('MMM Do YY')} />
				<Item item="% of votes with a positive feedback rating" value={task.positiveFeedback} />
				<Item item="Users Trained" value={task.usersTrained} />
				<Item item='Total "Very Satisfied" votes' value={task.verySatisfied} />
				<Item item="Total skips" value={task.skips} />
				<Item item='Total "Somewhat Satisfied" votes' value={task.somewhatSatisfied} />
				<Item item="Code submissions" value={task.codeSubmissions} />
				<Item item='Total "Not Satisfied" votes' value={task.notSatisfied} />
				<Item item="Total Times Completed" value={task.timesCompleted} />
			</div>
		</div>
	);
};
