import React from 'react';
import styles from './solution.module.scss';
import PeopleIcon from '@material-ui/icons/People';
import ForumIcon from '@material-ui/icons/Forum';
// import { Divider } from '@material-ui/core';

export interface ISolutionProps {
	solution: string;
}

export const Solution = ({ solution }: ISolutionProps) => {
	return (
		<div className={styles.solution}>
			<div className={styles.header}>
				{<PeopleIcon />}
				<h3>User 4321421</h3>
			</div>
			<div className={styles.code}>
				<code>{solution}</code>
			</div>
			<div className={styles.footer}>
				<div className={styles.messages}>
					<ForumIcon />
					<div>35</div>
				</div>
			</div>
		</div>
	);
};
