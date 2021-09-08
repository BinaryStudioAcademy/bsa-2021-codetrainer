import React from 'react';
import styles from './stats.module.scss';
import { Item } from './item';
import { WebApi } from 'typings/webapi';
import moment from 'moment';

export interface IStatsProps {
	task: WebApi.Entities.IChallenge;
	stats: WebApi.Entities.IStats;
}

export const Stats = ({ task, stats }: IStatsProps) => {
	return (
		<div className={styles.stats}>
			<h3>Stats</h3>
			<div className={styles.data}>
				<Item item="Created" value={moment(task.createdAt).format('MMM Do YY')} />
				<Item item="Users Trained" value={stats.usersTrained || 0} />
				<Item item="Total unlocked" value={stats.totalUnlocked || 0} />
				<Item item="Total skips" value={stats.totalSkips || 0} />
				<Item item="Users completed" value={stats.usersCompleted || 0} />
			</div>
		</div>
	);
};
