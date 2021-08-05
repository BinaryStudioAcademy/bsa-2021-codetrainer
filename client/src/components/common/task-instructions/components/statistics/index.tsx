import React from 'react';
import clsx from 'clsx';
import styles from './statistics.module.scss';
import { Icon, IconName } from '@blueprintjs/core';

interface IStatisticsProps {
	icon: IconName;
	content: JSX.Element;
	divider?: boolean;
}

const Statistics: React.FC<IStatisticsProps> = ({ icon, content, divider = false }) => {
	return (
		<div className={clsx(styles.info, { [styles.infoDivider]: divider })}>
			<Icon icon={icon} color="rgba(40, 40, 40, 0.5)" />
			<div className={styles.infoDescription}>{content}</div>
		</div>
	);
};

export default Statistics;
