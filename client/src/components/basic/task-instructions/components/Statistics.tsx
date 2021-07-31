import React from 'react';
import styles from './statistics.module.scss';
import { Icon, IconName } from '@blueprintjs/core';

interface IStatisticsProps {
	icon: IconName;
	content: JSX.Element;
	divider?: boolean;
}

const Statistics: React.FC<IStatisticsProps> = ({ icon, content, divider = false }) => {
	return (
		<div className={`${styles.info} ${divider ? styles.infoDivider : ''}`}>
			<Icon icon={icon} color="rgba(40, 40, 40, 0.5)" />
			<div className={styles.infoDescription}>{content}</div>
		</div>
	);
};

export default Statistics;
