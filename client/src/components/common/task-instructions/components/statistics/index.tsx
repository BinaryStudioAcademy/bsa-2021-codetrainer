import React from 'react';
import clsx from 'clsx';
import { Icon } from '@material-ui/core';
import { IStatisticsProps } from './types';
import styles from './statistics.module.scss';

const Statistics: React.FC<IStatisticsProps> = ({ icon, content, divider = false }) => {
	return (
		<div className={clsx(styles.info, { [styles.infoDivider]: divider })}>
			<Icon className={clsx(styles.infoIcon, icon)} />
			<div className={styles.infoDescription}>{content}</div>
		</div>
	);
};

export default Statistics;
