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
			<FontAwesomeIcon icon={icon} size="lg" color="rgba(40, 40, 40, 0.5)" />
			<div className={styles.infoDescription}>{content}</div>
		</div>
	);
};

export default Statistics;
