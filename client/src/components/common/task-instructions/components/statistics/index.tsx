import React from 'react';
import clsx from 'clsx';
import styles from './statistics.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface IStatisticsProps {
	icon: IconDefinition;
	content: JSX.Element;
	divider?: boolean;
}

const Statistics: React.FC<IStatisticsProps> = ({ icon, content, divider = false }) => {
	return (
		<div className={clsx(styles.info, { [styles.infoDivider]: divider })}>
			<FontAwesomeIcon className={styles.icon} icon={icon} size="lg" />
			<div className={styles.infoDescription}>{content}</div>
		</div>
	);
};

export default Statistics;
