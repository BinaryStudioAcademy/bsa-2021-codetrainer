import React from 'react';
import styles from './contributors.module.scss';
import { Avatar } from 'components/basic';

export const Contributors = () => {
	return (
		<div className={styles.contributors}>
			<p>These users have contributed to this task:</p>
			<div className={styles.users}>
				<Avatar size={60} />
				<Avatar size={60} />
				<Avatar size={60} />
			</div>
		</div>
	);
};
